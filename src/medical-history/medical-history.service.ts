
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalRecordEntry } from 'src/entity/clinicalRecordEntry';
import { CreateClinicalRecordEntryDto } from './dto/create-medical-history.dto';
import { User } from '../entity/user';
import { MedicalEventType } from '../entity/medicalEventType';
import { HealthEntity } from '../entity/healthEntity';
import { PhysicalAttentionSpace } from '../entity/physicalAttentionSpace';
import { MedicalAppointment } from '../entity/medicalAppointment';
import { ClinicalRecordDiagnosis } from '../entity/clinicalRecordDiagnosis';
import { DiagnosisCode } from '../entity/diagnosisCode';
import { Prescription } from '../entity/prescription';
import { PrescriptionMedicationDetail } from '../entity/prescriptionMedicationDetail';
import { CommercialMedicationPresentation } from '../entity/commercialMedicationPresentation';
import { GeneralMedication } from '../entity/generalMedication';
import { ExamResult } from '../entity/examResult';
import { ExamResultDetail } from '../entity/examResultDetail';
import { ExamParameter } from '../entity/examParameter';
import { ClinicalRecordAttachment } from '../entity/clinicalRecordAttachment';


@Injectable()
export class MedicalHistoryService {
  constructor(
    // --- Repositorios PRINCIPALES que faltaban ---
    @InjectRepository(ClinicalRecordEntry)
    private readonly entryRepository: Repository<ClinicalRecordEntry>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MedicalEventType)
    private readonly eventTypeRepository: Repository<MedicalEventType>,
    @InjectRepository(HealthEntity)
    private readonly healthEntityRepository: Repository<HealthEntity>,
    @InjectRepository(PhysicalAttentionSpace)
    private readonly spaceRepository: Repository<PhysicalAttentionSpace>,
    @InjectRepository(MedicalAppointment)
    private readonly appointmentRepository: Repository<MedicalAppointment>,
    // --- DataSource y repositorios de detalle (estos ya los tenías) ---
    private readonly dataSource: DataSource,
    @InjectRepository(ClinicalRecordDiagnosis) private readonly diagnosisRepository: Repository<ClinicalRecordDiagnosis>,
    @InjectRepository(Prescription) private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(PrescriptionMedicationDetail) private readonly presMedDetailRepository: Repository<PrescriptionMedicationDetail>,
    @InjectRepository(ExamResult) private readonly examResultRepository: Repository<ExamResult>,
    @InjectRepository(ExamResultDetail) private readonly examResDetailRepository: Repository<ExamResultDetail>,
    @InjectRepository(ClinicalRecordAttachment) private readonly attachmentRepository: Repository<ClinicalRecordAttachment>,
    @InjectRepository(DiagnosisCode) private readonly diagnosisCodeRepository: Repository<DiagnosisCode>,
    @InjectRepository(CommercialMedicationPresentation) private readonly medPresentationRepository: Repository<CommercialMedicationPresentation>,
    @InjectRepository(ExamParameter) private readonly examParameterRepository: Repository<ExamParameter>
  ) {}

  async createEntry(
    patientId: string,
    attendingDoctorId: string,
    dto: CreateClinicalRecordEntryDto,
  ): Promise<ClinicalRecordEntry> {
    // Validar paciente
    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${patientId} no encontrado.`);
    }
    // Validar médico
    const doctor = await this.userRepository.findOneBy({ id: attendingDoctorId });
    if (!doctor) {
      throw new NotFoundException(`Médico (usuario) con ID ${attendingDoctorId} no encontrado.`);
    }
    // Validar tipo de evento
    const eventType = await this.eventTypeRepository.findOneBy({ id: dto.eventTypeId });
    if (!eventType) {
      throw new BadRequestException(`Tipo de Evento Médico con ID ${dto.eventTypeId} no encontrado.`);
    }
    // Validar entidad de salud
    const healthEntity = await this.healthEntityRepository.findOneBy({ id: dto.attentionHealthEntityId });
    if (!healthEntity) {
      throw new BadRequestException(`Entidad de Salud con ID ${dto.attentionHealthEntityId} no encontrada.`);
    }
    // Validar espacio (opcional)
    if (dto.attentionSpaceId !== undefined && dto.attentionSpaceId !== null) {
      const space = await this.spaceRepository.findOneBy({ id: dto.attentionSpaceId });
      if (!space) { throw new BadRequestException(`Espacio de Atención con ID ${dto.attentionSpaceId} no encontrado.`); }
    }
    // Validar cita (opcional)
    if (dto.associatedAppointmentId !== undefined && dto.associatedAppointmentId !== null) {
      const appointment = await this.appointmentRepository.findOneBy({ id: dto.associatedAppointmentId });
      if (!appointment) { throw new BadRequestException(`Cita Médica con ID ${dto.associatedAppointmentId} no encontrada.`); }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newEntryData: Partial<ClinicalRecordEntry> = {
        patientUserId: patientId,
        attendingDoctorUserId: attendingDoctorId,
        attentionHealthEntityId: dto.attentionHealthEntityId,
        eventTypeId: dto.eventTypeId,
        attentionStartDateTime: new Date(dto.attentionStartDateTime),
        narrativeSummary: dto.narrativeSummary,
      };
      if (dto.attentionSpaceId !== undefined) newEntryData.attentionSpaceId = dto.attentionSpaceId;
      if (dto.associatedAppointmentId !== undefined) newEntryData.associatedAppointmentId = dto.associatedAppointmentId;

      const newEntry = queryRunner.manager.create(ClinicalRecordEntry, newEntryData);
      const savedEntry = await queryRunner.manager.save(newEntry);

      // Guardar Detalles (diagnoses, prescriptions, etc.)
      if (dto.diagnoses && dto.diagnoses.length > 0) { /* ... tu lógica ... */ }
      if (dto.prescriptions && dto.prescriptions.length > 0) { /* ... tu lógica ... */ }
      if (dto.examResults && dto.examResults.length > 0) { /* ... tu lógica ... */ }
      if (dto.attachments && dto.attachments.length > 0) { /* ... tu lógica ... */ }

      await queryRunner.commitTransaction();

      return this.entryRepository.findOneOrFail({ // Usa this.entryRepository aquí
        where: { id: savedEntry.id },
        relations: { /* ... tus relations para el GET ... */
            eventType: true, attendingDoctor: true, attentionHealthEntity: true,
            associatedAppointment: true, attentionSpace: true,
            diagnoses: { diagnosisCode: true },
            prescriptions: { medicationDetails: { medicationPresentation: { generalMedication: true } } },
            examResults: { parameterDetails: { examParameter: true } },
            attachments: true
        }
      });

    } catch (error) { /* ... tu manejo de error ... */ }
    finally {
      await queryRunner.release();
    }
    throw new InternalServerErrorException('Flujo inesperado alcanzado en createEntry.');
  }

  async getPatientHistoryEntries(patientId: string): Promise<ClinicalRecordEntry[]> {
    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) { throw new NotFoundException(`Paciente con ID ${patientId} no encontrado.`); }

    return this.entryRepository.find({
      where: { patientUserId: patientId },
      order: { attentionStartDateTime: 'DESC' },
      relations: { /* ... tus relations ... */
        eventType: true, attendingDoctor: true, attentionHealthEntity: true,
        associatedAppointment: true, attentionSpace: true,
        diagnoses: { diagnosisCode: true },
        prescriptions: { medicationDetails: { medicationPresentation: { generalMedication: true } } },
        examResults: { parameterDetails: { examParameter: true } },
        attachments: true
      },
    });
  }
}