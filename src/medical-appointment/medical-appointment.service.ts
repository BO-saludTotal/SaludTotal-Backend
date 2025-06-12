import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { MedicalAppointment, AppointmentStatusType } from '../entity/medicalAppointment'; 
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { AvailabilitySlot, SlotStatus } from '../entity/availabilitySlot'; 
import { User } from '../entity/user'; 
import { AppointmentChangeHistory } from '../entity/appointmentChangeHistory'; 
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto'; 
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';   
import { AllowedRoles } from '../auth/enums/allowed-roles.enum';   

@Injectable()
export class MedicalAppointmentService {
  constructor(
    @InjectRepository(MedicalAppointment)
    private readonly appointmentRepository: Repository<MedicalAppointment>,
    @InjectRepository(AvailabilitySlot)
    private readonly slotRepository: Repository<AvailabilitySlot>,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    @InjectRepository(AppointmentChangeHistory)
    private readonly changeHistoryRepository: Repository<AppointmentChangeHistory>,
    private readonly dataSource: DataSource, 
  ) {}

  async create(
    patientUserId: string, 
    createDto: CreateMedicalAppointmentDto,
  ): Promise<MedicalAppointment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const patient = await queryRunner.manager.findOneBy(User, { id: patientUserId });
      if (!patient) {
        throw new NotFoundException(`Usuario paciente con ID ${patientUserId} no encontrado.`);
      }

      const slot = await queryRunner.manager.findOneBy(AvailabilitySlot, { id: createDto.slotId });
      if (!slot) {
        throw new NotFoundException(`Slot de disponibilidad con ID ${createDto.slotId} no encontrado.`);
      }
      if (slot.status !== 'Disponible' as SlotStatus) {
        throw new BadRequestException(`El slot con ID ${createDto.slotId} ya no está disponible.`);
      }


      slot.status = 'Confirmado' as SlotStatus; 
      await queryRunner.manager.save(AvailabilitySlot, slot);

      
      const newAppointmentEntity = queryRunner.manager.create(MedicalAppointment, {
        slotId: slot.id, 
        patientUserId: patientUserId,
       
        status: 'Confirmada' as AppointmentStatusType, 
        patientReason: createDto.patientReason,
      });
      const savedAppointment = await queryRunner.manager.save(MedicalAppointment, newAppointmentEntity);

     
      const historyEntry = queryRunner.manager.create(AppointmentChangeHistory, {
        appointmentId: savedAppointment.id,
        changedByUserId: patientUserId, 
       
        newStatus: savedAppointment.status,
        reasonForChangeOrCancellation: 'Creación de cita',
      });
      await queryRunner.manager.save(AppointmentChangeHistory, historyEntry);

      await queryRunner.commitTransaction();

     
      return this.appointmentRepository.findOneOrFail({
        where: { id: savedAppointment.id },
        relations: {
          slot: { 
            doctorUser: { doctorDetail: true }, 
            healthEntity: true,
            attentionSpace: true,
            offeredAttentionType: true,
          },
          patientUser: { patientDetail: true }, 
    
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

  async findMyAppointments(patientUserId: string): Promise<MedicalAppointment[]> {
    return this.appointmentRepository.find({
      where: { patientUserId: patientUserId },
      relations: { 
        slot: { doctorUser: { doctorDetail: true }, healthEntity: true, attentionSpace: true, offeredAttentionType: true },
        patientUser: { patientDetail: true },
      },
      order: { requestDateTime: 'DESC' }, 
    });
  }

  async findOne(appointmentId: number, requestingUserId: string, userRoles: string[]): Promise<MedicalAppointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: { 
        slot: { doctorUser: { doctorDetail: true }, healthEntity: true, attentionSpace: true, offeredAttentionType: true },
        patientUser: { patientDetail: true },
        changeHistory: { changedByUser: true }, 
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Cita con ID ${appointmentId} no encontrada.`);
    }


    if (userRoles.includes(AllowedRoles.Paciente as string) && appointment.patientUserId !== requestingUserId) {
      throw new ForbiddenException('No tienes permiso para ver esta cita.');
    }
   

    return appointment;
  }

  async reschedule(
    appointmentId: number,
    patientUserId: string, 
    rescheduleDto: RescheduleAppointmentDto,
  ): Promise<MedicalAppointment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const appointment = await queryRunner.manager.findOne(MedicalAppointment, {
        where: { id: appointmentId, patientUserId: patientUserId }, 
        relations: ['slot'], 
      });

      if (!appointment) {
        throw new NotFoundException(`Cita con ID ${appointmentId} no encontrada para este paciente o ya no se puede modificar.`);
      }
      if (appointment.status !== 'Confirmada' as AppointmentStatusType && appointment.status !== 'Solicitada' as AppointmentStatusType) {
          throw new BadRequestException('Solo se pueden reprogramar citas confirmadas o solicitadas.');
      }

     
      const now = new Date();
      const appointmentTime = new Date(appointment.slot.startDateTime); 
      const diffMinutes = (appointmentTime.getTime() - now.getTime()) / (1000 * 60); // Diferencia en minutos
      if (diffMinutes < 1) {
        throw new BadRequestException('No se puede reprogramar la cita con menos de 1 minuto de antelación.');
      }

     
      const newSlot = await queryRunner.manager.findOneBy(AvailabilitySlot, { id: rescheduleDto.newSlotId });
      if (!newSlot) {
        throw new NotFoundException(`Nuevo slot de disponibilidad con ID ${rescheduleDto.newSlotId} no encontrado.`);
      }
      if (newSlot.status !== 'Disponible' as SlotStatus) {
        throw new BadRequestException(`El nuevo slot con ID ${rescheduleDto.newSlotId} ya no está disponible.`);
      }

      if (newSlot.doctorUserId !== appointment.slot.doctorUserId) {
          throw new BadRequestException('Solo se puede reprogramar con el mismo médico.');
      }


      const oldSlotId = appointment.slotId;
      const oldSlot = await queryRunner.manager.findOneBy(AvailabilitySlot, { id: oldSlotId });

 
      if (oldSlot) {
        oldSlot.status = 'Disponible' as SlotStatus;
        await queryRunner.manager.save(AvailabilitySlot, oldSlot);
      }


      newSlot.status = 'Confirmado' as SlotStatus; 
      await queryRunner.manager.save(AvailabilitySlot, newSlot);


      const previousStatus = appointment.status;
      appointment.slotId = newSlot.id;
      appointment.slot = newSlot; 
      appointment.status = 'Modificada' as AppointmentStatusType;
      
      if(rescheduleDto.reason) appointment.patientReason = rescheduleDto.reason;
      const updatedAppointment = await queryRunner.manager.save(MedicalAppointment, appointment);

  
      const historyEntry = queryRunner.manager.create(AppointmentChangeHistory, {
        appointmentId: updatedAppointment.id,
        changedByUserId: patientUserId,
        previousStatus: previousStatus,
        newStatus: updatedAppointment.status,
        reasonForChangeOrCancellation: `Reprogramada a nuevo slot ID: ${newSlot.id}. Motivo: ${rescheduleDto.reason || 'No especificado'}`,
      });
      await queryRunner.manager.save(AppointmentChangeHistory, historyEntry);

      await queryRunner.commitTransaction();
      return this.findOne(updatedAppointment.id, patientUserId, [AllowedRoles.Paciente as string]); 
    } catch (error) {
      await queryRunner.rollbackTransaction();
  
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async cancel(
    appointmentId: number,
    requestingUserId: string, 
    userRoles: string[],
    cancelDto: CancelAppointmentDto,
  ): Promise<{ message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const appointment = await queryRunner.manager.findOne(MedicalAppointment, {
        where: { id: appointmentId },
        relations: ['slot', 'patientUser'], 
      });

      if (!appointment) {
        throw new NotFoundException(`Cita con ID ${appointmentId} no encontrada.`);
      }

      // Verificar permisos
      const isPatientOfAppointment = appointment.patientUserId === requestingUserId;
      const isDoctorOfAppointment = appointment.slot.doctorUserId === requestingUserId && userRoles.includes(AllowedRoles.Medico as string);

      if (!isPatientOfAppointment && !isDoctorOfAppointment) {
        // Podrías añadir un rol Admin que también pueda cancelar
        throw new ForbiddenException('No tienes permiso para cancelar esta cita.');
      }

      if (appointment.status === ('CanceladaPorPaciente' as AppointmentStatusType) || appointment.status === ('CanceladaPorMedico' as AppointmentStatusType)) {
          throw new BadRequestException('La cita ya ha sido cancelada.');
      }
      // Aquí también podrías añadir lógica de límite de tiempo para cancelar

      const previousStatus = appointment.status;
      appointment.status = isPatientOfAppointment ? 'CanceladaPorPaciente' as AppointmentStatusType : 'CanceladaPorMedico' as AppointmentStatusType;
      await queryRunner.manager.save(MedicalAppointment, appointment);

      // Liberar el slot
      if (appointment.slot) {
        const slotToFree = await queryRunner.manager.findOneBy(AvailabilitySlot, { id: appointment.slotId });
        if (slotToFree) {
          slotToFree.status = 'Disponible' as SlotStatus;
          await queryRunner.manager.save(AvailabilitySlot, slotToFree);
        }
      }

      // Registrar cambio en historial
      const historyEntry = queryRunner.manager.create(AppointmentChangeHistory, {
        appointmentId: appointment.id,
        changedByUserId: requestingUserId,
        previousStatus: previousStatus,
        newStatus: appointment.status,
        reasonForChangeOrCancellation: cancelDto.reason || 'Cancelación de cita',
      });
      await queryRunner.manager.save(AppointmentChangeHistory, historyEntry);

      await queryRunner.commitTransaction();
      return { message: 'Cita cancelada exitosamente.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // ... manejo de errores ...
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}