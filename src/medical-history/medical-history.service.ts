
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { CreateClinicalRecordEntryDto } from 'src/clinical-record-entry/dto/create-clinical-record-entry.dto';
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
  ) {}

  async createEntry(
    patientId: string, 
    attendingDoctorId: string, 
    dto: CreateClinicalRecordEntryDto,
  ): Promise<ClinicalRecordEntry> {

    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${patientId} no encontrado.`);
    }



    const doctor = await this.userRepository.findOneBy({ id: attendingDoctorId });
    if (!doctor) {
    
      throw new NotFoundException(`Médico (usuario) con ID ${attendingDoctorId} no encontrado.`);
    }
   

    const eventType = await this.eventTypeRepository.findOneBy({ id: dto.eventTypeId });
    if (!eventType) {
      throw new BadRequestException(`Tipo de Evento Médico con ID ${dto.eventTypeId} no encontrado.`);
    }


    const healthEntity = await this.healthEntityRepository.findOneBy({ id: dto.attentionHealthEntityId });
    if (!healthEntity) {
      throw new BadRequestException(`Entidad de Salud con ID ${dto.attentionHealthEntityId} no encontrada.`);
    }

  
    if (dto.attentionSpaceId !== undefined && dto.attentionSpaceId !== null) { 
      const space = await this.spaceRepository.findOneBy({ id: dto.attentionSpaceId });
      if (!space) {
        throw new BadRequestException(`Espacio de Atención con ID ${dto.attentionSpaceId} no encontrado.`);
      }
 
    }


    if (dto.associatedAppointmentId !== undefined && dto.associatedAppointmentId !== null) { 
      const appointment = await this.appointmentRepository.findOneBy({ id: dto.associatedAppointmentId });
      if (!appointment) {
        throw new BadRequestException(`Cita Médica con ID ${dto.associatedAppointmentId} no encontrada.`);
      }

    }

    const newEntryData: Partial<ClinicalRecordEntry> = {
      patientUserId: patientId,
      attendingDoctorUserId: attendingDoctorId,
      attentionHealthEntityId: dto.attentionHealthEntityId,
      eventTypeId: dto.eventTypeId,
      attentionStartDateTime: new Date(dto.attentionStartDateTime),
      narrativeSummary: dto.narrativeSummary,
    };

    if (dto.attentionSpaceId !== undefined) {
      newEntryData.attentionSpaceId = dto.attentionSpaceId;
    }
    if (dto.associatedAppointmentId !== undefined) {
      newEntryData.associatedAppointmentId = dto.associatedAppointmentId;
    }

    const newEntry = this.entryRepository.create(newEntryData);

    try {
      return await this.entryRepository.save(newEntry);
    } catch (dbError) {
      console.error("Error de base de datos al guardar entrada de historial:", dbError);
   
      throw new InternalServerErrorException('Error al guardar la entrada del historial clínico en la base de datos.');
    }
  }


  async getPatientHistoryEntries(patientId: string): Promise<ClinicalRecordEntry[]> {

    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${patientId} no encontrado.`);
    }

    
    return this.entryRepository.find({
      where: { patientUserId: patientId },
      order: { attentionStartDateTime: 'DESC' },
      
      relations: {
        eventType: true, 
        attendingDoctor: true, 
        attentionHealthEntity: true, 
        associatedAppointment: true, 
        attentionSpace: true, 
        diagnoses:{
          diagnosisCode:true
        },
        prescriptions: {
          medicationDetails: {
            medicationPresentation:{
              generalMedication:true,
            },
          },
        },
        examResults: {
          parameterDetails:{
            examParameter:true,
          },
        },
        attachments:true
      },
      
    });
  }
}