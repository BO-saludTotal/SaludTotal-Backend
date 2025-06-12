import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { MedicalAppointment, AppointmentStatusType } from '../entity/medicalAppointment'; 
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { AvailabilitySlot, SlotStatus } from '../entity/availabilitySlot'; 
import { User } from '../entity/user'; 
import { AppointmentChangeHistory } from '../entity/appointmentChangeHistory'; 

@Injectable()
export class MedicalAppointmentService {
  constructor(
    @InjectRepository(MedicalAppointment)
    private readonly appointmentRepository: Repository<MedicalAppointment>,
    @InjectRepository(AvailabilitySlot)
    private readonly slotRepository: Repository<AvailabilitySlot>,
    @InjectRepository(User) // Para validar al paciente
    private readonly userRepository: Repository<User>,
    @InjectRepository(AppointmentChangeHistory)
    private readonly changeHistoryRepository: Repository<AppointmentChangeHistory>,
    private readonly dataSource: DataSource, // Para transacciones
  ) {}

  async create(
    patientUserId: string, // UUID del paciente autenticado
    createDto: CreateMedicalAppointmentDto,
  ): Promise<MedicalAppointment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Validar que el usuario paciente exista (aunque JwtAuthGuard ya lo hizo, una doble verificación no daña)
      const patient = await queryRunner.manager.findOneBy(User, { id: patientUserId });
      if (!patient) {
        throw new NotFoundException(`Usuario paciente con ID ${patientUserId} no encontrado.`);
      }
      // Aquí podrías verificar explícitamente si el usuario tiene el rol "Paciente" si es necesario.

      // 2. Obtener y validar el slot de disponibilidad
      const slot = await queryRunner.manager.findOneBy(AvailabilitySlot, { id: createDto.slotId });
      if (!slot) {
        throw new NotFoundException(`Slot de disponibilidad con ID ${createDto.slotId} no encontrado.`);
      }
      if (slot.status !== 'Disponible' as SlotStatus) {
        throw new BadRequestException(`El slot con ID ${createDto.slotId} ya no está disponible.`);
      }

      // 3. Actualizar el estado del slot a 'Confirmado' (o 'Reservado')
      slot.status = 'Confirmado' as SlotStatus; // O 'Reservado' si hay un paso de confirmación
      await queryRunner.manager.save(AvailabilitySlot, slot);

      // 4. Crear la nueva cita médica
      const newAppointmentEntity = queryRunner.manager.create(MedicalAppointment, {
        slotId: slot.id, // o slot: slot si la relación está configurada para aceptar la entidad
        patientUserId: patientUserId,
        // requestDateTime se maneja por @CreateDateColumn en la entidad MedicalAppointment
        status: 'Confirmada' as AppointmentStatusType, // Estado inicial
        patientReason: createDto.patientReason,
      });
      const savedAppointment = await queryRunner.manager.save(MedicalAppointment, newAppointmentEntity);

      // 5. (Opcional pero recomendado) Crear entrada en HistorialCambiosCita
      const historyEntry = queryRunner.manager.create(AppointmentChangeHistory, {
        appointmentId: savedAppointment.id,
        changedByUserId: patientUserId, // El paciente mismo creó la cita
        // changeDateTime se maneja por @CreateDateColumn
        newStatus: savedAppointment.status,
        reasonForChangeOrCancellation: 'Creación de cita',
      });
      await queryRunner.manager.save(AppointmentChangeHistory, historyEntry);

      await queryRunner.commitTransaction();

      // Devolver la cita creada, cargando las relaciones que el frontend podría necesitar
      return this.appointmentRepository.findOneOrFail({
        where: { id: savedAppointment.id },
        relations: {
          slot: { // Detalles del slot reservado
            doctorUser: { doctorDetail: true }, // Info del médico
            healthEntity: true,
            attentionSpace: true,
            offeredAttentionType: true,
          },
          patientUser: { patientDetail: true }, // Info del paciente
          // changeHistory: true, // Opcional cargar el historial de cambios aquí
        },
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Error creando cita médica:", error);
      if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear la cita médica.');
    } finally {
      await queryRunner.release();
    }
  }

  // Aquí irían los métodos para findAllByPatient, findOne, update (reschedule), cancel, etc.
}