
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
import { ExamResultService } from 'src/exam-result/exam-result.service';
import { ExamResult } from '../entity/examResult';
import { ExamResultDetail } from '../entity/examResultDetail';
import { ExamParameter } from '../entity/examParameter';
import { ClinicalRecordAttachment } from '../entity/clinicalRecordAttachment';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { ClinicalRecordAttachmentService } from 'src/clinical-record-attachment/clinical-record-attachment.service';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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
    private readonly prescriptionService: PrescriptionService,
    private readonly examResultService: ExamResultService,
    private readonly attachmentService: ClinicalRecordAttachmentService,
    private readonly dataSource: DataSource,
    @InjectRepository(ClinicalRecordDiagnosis)
    private readonly diagnosisRepository: Repository<ClinicalRecordDiagnosis>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(PrescriptionMedicationDetail)
    private readonly presMedDetailRepository: Repository<PrescriptionMedicationDetail>,
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
    @InjectRepository(ExamResultDetail)
    private readonly examResDetailRepository: Repository<ExamResultDetail>,
    @InjectRepository(ClinicalRecordAttachment)
    private readonly attachmentRepository: Repository<ClinicalRecordAttachment>,
    @InjectRepository(DiagnosisCode)
    private readonly diagnosisCodeRepository: Repository<DiagnosisCode>,
    @InjectRepository(CommercialMedicationPresentation)
    private readonly medPresentationRepository: Repository<CommercialMedicationPresentation>,
    @InjectRepository(ExamParameter)
    private readonly examParameterRepository: Repository<ExamParameter>,
  ) {}

  async createEntry(
    patientId: string,
    attendingDoctorId: string,
    dto: CreateClinicalRecordEntryDto,
  ): Promise<ClinicalRecordEntry> {

    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${patientId} no encontrado.`,
      );
    }

    const doctor = await this.userRepository.findOneBy({
      id: attendingDoctorId,
    });
    if (!doctor) {
      throw new NotFoundException(
        `Médico (usuario) con ID ${attendingDoctorId} no encontrado.`,
      );
    }

    const eventType = await this.eventTypeRepository.findOneBy({
      id: dto.eventTypeId,
    });
    if (!eventType) {
      throw new BadRequestException(
        `Tipo de Evento Médico con ID ${dto.eventTypeId} no encontrado.`,
      );
    }

    const healthEntity = await this.healthEntityRepository.findOneBy({
      id: dto.attentionHealthEntityId,
    });
    if (!healthEntity) {
      throw new BadRequestException(
        `Entidad de Salud con ID ${dto.attentionHealthEntityId} no encontrada.`,
      );
    }

    if (dto.attentionSpaceId !== undefined && dto.attentionSpaceId !== null) {
      const space = await this.spaceRepository.findOneBy({
        id: dto.attentionSpaceId,
      });
      if (!space) {
        throw new BadRequestException(
          `Espacio de Atención con ID ${dto.attentionSpaceId} no encontrado.`,
        );
      }
    }

    if (
      dto.associatedAppointmentId !== undefined &&
      dto.associatedAppointmentId !== null
    ) {
      const appointment = await this.appointmentRepository.findOneBy({
        id: dto.associatedAppointmentId,
      });
      if (!appointment) {
        throw new BadRequestException(
          `Cita Médica con ID ${dto.associatedAppointmentId} no encontrada.`,
        );
      }
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
      if (dto.attentionSpaceId !== undefined)
        newEntryData.attentionSpaceId = dto.attentionSpaceId;
      if (dto.associatedAppointmentId !== undefined)
        newEntryData.associatedAppointmentId = dto.associatedAppointmentId;

      const newEntry = queryRunner.manager.create(
        ClinicalRecordEntry,
        newEntryData,
      );
      const savedEntry = await queryRunner.manager.save(newEntry);


      if (dto.diagnoses && dto.diagnoses.length > 0) {
        for (const diagDto of dto.diagnoses) {

          const codeExists = await this.diagnosisCodeRepository.findOneBy({ cieCode: diagDto.cieCode });
          if (!codeExists) throw new BadRequestException(`Código CIE ${diagDto.cieCode} no válido.`);

          const diagnosis = queryRunner.manager.create(ClinicalRecordDiagnosis, {
            clinicalRecordEntryId: savedEntry.id,

            cieCode: diagDto.cieCode,
            diagnosisType: diagDto.diagnosisType,
          });
          await queryRunner.manager.save(diagnosis);
        }
      }
      if (dto.prescriptions && dto.prescriptions.length > 0) {
        	for (const presDto of dto.prescriptions) {
          await this.prescriptionService.create(savedEntry.id, presDto);
        }
      }
      if (dto.examResults && dto.examResults.length > 0) {
        for (const examDto of dto.examResults) {
          await this.examResultService.create(savedEntry.id, examDto);
        }
      }
      if (dto.attachments && dto.attachments.length > 0) {
        for (const attachDto of dto.attachments) {
          await this.attachmentService.create(savedEntry.id, attachDto);
        }
      }

      await queryRunner.commitTransaction();

      return this.entryRepository.findOneOrFail({
   
        where: { id: savedEntry.id },
        relations: {
          eventType: true,
          attendingDoctor: true,
          attentionHealthEntity: true,
          associatedAppointment: true,
          attentionSpace: true,
          diagnoses: { diagnosisCode: true },
          prescriptions: {
            medicationDetails: {
              medicationPresentation: { generalMedication: true },
            },
          },
          examResults: { parameterDetails: { examParameter: true } },
          attachments: true,
        },
      });
    } catch (error) {

    } finally {
      await queryRunner.release();
    }
    throw new InternalServerErrorException(
      'Flujo inesperado alcanzado en createEntry.',
    );
  }

  async getPatientHistoryEntries(
    patientId: string,
  ): Promise<ClinicalRecordEntry[]> {
    const patient = await this.userRepository.findOneBy({ id: patientId });
    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${patientId} no encontrado.`,
      );
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
        diagnoses: { diagnosisCode: true },
        prescriptions: {
          medicationDetails: {
            medicationPresentation: { generalMedication: true },
          },
        },
        examResults: { parameterDetails: { examParameter: true } },
        attachments: true,
      },
    });
  }
  async updateEntry(
    entryId: number,
    patientId: string,
    attendingDoctorId: string, 
    updateDto: UpdateMedicalHistoryDto,
  ): Promise<ClinicalRecordEntry> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const recordEntry = await queryRunner.manager.findOne(ClinicalRecordEntry, {
        where: { id: entryId, patientUserId: patientId },
        relations: ['diagnoses', 'prescriptions', 'prescriptions.medicationDetails', 'examResults', 'examResults.parameterDetails', 'attachments'],
      });

      if (!recordEntry) {
        throw new NotFoundException(`Entrada de historial con ID ${entryId} para el paciente ${patientId} no encontrada.`);
      }

     
      const updatedEntryData = await queryRunner.manager.preload(ClinicalRecordEntry, {
        id: entryId, 
        ...updateDto,
        attentionStartDateTime: updateDto.attentionStartDateTime
          ? new Date(updateDto.attentionStartDateTime)
          : recordEntry.attentionStartDateTime, 

      });
      if (!updatedEntryData) {
        throw new NotFoundException(`No se pudo cargar la entrada clínica con ID ${entryId} para su actualización.`);
      }
      delete (updatedEntryData as any).diagnoses;
      delete (updatedEntryData as any).prescriptions;
      delete (updatedEntryData as any).examResults;
      delete (updatedEntryData as any).attachments;

      await queryRunner.manager.save(ClinicalRecordEntry, updatedEntryData);



      if (updateDto.diagnoses !== undefined) { 
     
        if (recordEntry.diagnoses && recordEntry.diagnoses.length > 0) {
          await queryRunner.manager.remove(ClinicalRecordDiagnosis, recordEntry.diagnoses);
        }
     
        for (const diagDto of updateDto.diagnoses) { 
          const codeExists = await this.diagnosisCodeRepository.findOneBy({ cieCode: diagDto.cieCode });
          if (!codeExists) throw new BadRequestException(`Código CIE ${diagDto.cieCode} no válido.`);
          const diagnosis = queryRunner.manager.create(ClinicalRecordDiagnosis, {
            clinicalRecordEntryId: entryId, ...diagDto });
          await queryRunner.manager.save(ClinicalRecordDiagnosis, diagnosis);
        }
      }

    
      if (updateDto.prescriptions !== undefined) {
        if (recordEntry.prescriptions && recordEntry.prescriptions.length > 0) {
          for (const pres of recordEntry.prescriptions) {
       
            if (pres.medicationDetails && pres.medicationDetails.length > 0) {
              await queryRunner.manager.remove(PrescriptionMedicationDetail, pres.medicationDetails);
            }
      
            await queryRunner.manager.remove(Prescription, pres);
          }
        }
        for (const presDto of updateDto.prescriptions) {
          const prescriptionEntity = queryRunner.manager.create(Prescription, {
            clinicalRecordEntryId: entryId,
            prescriptionDate: new Date(presDto.prescriptionDate),
          });
          const savedPrescription = await queryRunner.manager.save(Prescription, prescriptionEntity);
          for (const medDto of presDto.medications) {
            const presExists = await this.medPresentationRepository.findOneBy({id: medDto.medicationPresentationId});
            if(!presExists) throw new BadRequestException(`Presentación de medicamento ID ${medDto.medicationPresentationId} no válida.`);
            const medDetail = queryRunner.manager.create(PrescriptionMedicationDetail, {
              prescriptionId: savedPrescription.id, ...medDto });
            await queryRunner.manager.save(PrescriptionMedicationDetail, medDetail);
          }
        }
      }

     
      if (updateDto.examResults !== undefined) {
        if (recordEntry.examResults && recordEntry.examResults.length > 0) {
            for (const examRes of recordEntry.examResults) {
                if (examRes.parameterDetails && examRes.parameterDetails.length > 0) {
                    await queryRunner.manager.remove(ExamResultDetail, examRes.parameterDetails);
                }
                await queryRunner.manager.remove(ExamResult, examRes);
            }
        }
        for (const examDto of updateDto.examResults) {
            const examResultEntity = queryRunner.manager.create(ExamResult, {
                clinicalRecordEntryId: entryId,
                generalExamName: examDto.generalExamName,
                resultIssueDate: examDto.resultIssueDate ? new Date(examDto.resultIssueDate) : null,
            });
            const savedExamResult = await queryRunner.manager.save(ExamResult, examResultEntity);
            for(const paramDto of examDto.parameters) {
                const paramExists = await this.examParameterRepository.findOneBy({id: paramDto.examParameterId});
                if(!paramExists) throw new BadRequestException(`Parámetro de exámen ID ${paramDto.examParameterId} no válido.`);
                const examParamDetail = queryRunner.manager.create(ExamResultDetail, {
                    examResultId: savedExamResult.id, ...paramDto });
                await queryRunner.manager.save(ExamResultDetail, examParamDetail);
            }
        }
      }

 
      if (updateDto.attachments !== undefined) {

        if (recordEntry.attachments && recordEntry.attachments.length > 0) {
          await queryRunner.manager.remove(ClinicalRecordAttachment, recordEntry.attachments);
        }
        for (const attachDto of updateDto.attachments) {
          const attachment = queryRunner.manager.create(ClinicalRecordAttachment, {
            clinicalRecordEntryId: entryId, ...attachDto });
          await queryRunner.manager.save(ClinicalRecordAttachment, attachment);
        }
      }

      await queryRunner.commitTransaction();

      return this.entryRepository.findOneOrFail({
        where: { id: entryId },
        relations: { 
          eventType: true,
          attendingDoctor: true,
          attentionHealthEntity: true,
          associatedAppointment: true,
          attentionSpace: true,
          diagnoses: { diagnosisCode: true },
          prescriptions: {
            medicationDetails: {
              medicationPresentation: { generalMedication: true },
            },
          },
          examResults: { parameterDetails: { examParameter: true } },
          attachments: true,
         }
      });

    } catch (error) { NotFoundException }
    finally { await queryRunner.release(); }
    throw new InternalServerErrorException('Flujo inesperado alcanzado en updateEntry.'); 
  }
}
