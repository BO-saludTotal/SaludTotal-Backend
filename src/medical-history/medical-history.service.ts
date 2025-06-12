
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException, ConflictException
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalRecordEntry } from 'src/entity/clinicalRecordEntry';
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
   
    private readonly dataSource: DataSource,
    @InjectRepository(ClinicalRecordDiagnosis)
    private readonly diagnosisRepository: Repository<ClinicalRecordDiagnosis>, 
    @InjectRepository(DiagnosisCode)
    private readonly diagnosisCodeRepository: Repository<DiagnosisCode>,
    @InjectRepository(Prescription) // Para crear Prescriptions directamente
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(PrescriptionMedicationDetail) // Para crear PrescriptionMedicationDetails directamente
    private readonly presMedDetailRepository: Repository<PrescriptionMedicationDetail>,
    @InjectRepository(CommercialMedicationPresentation)
    private readonly medPresentationRepository: Repository<CommercialMedicationPresentation>,
    @InjectRepository(ExamResult) // Para crear ExamResults directamente
    private readonly examResultRepository: Repository<ExamResult>,
    @InjectRepository(ExamResultDetail) // Para crear ExamResultDetails directamente
    private readonly examResDetailRepository: Repository<ExamResultDetail>,
    @InjectRepository(ExamParameter)
    private readonly examParameterRepository: Repository<ExamParameter>,
    @InjectRepository(ClinicalRecordAttachment) // Para crear Attachments directamente
    private readonly attachmentRepository: Repository<ClinicalRecordAttachment>
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
      if (dto.attentionSpaceId !== undefined) newEntryData.attentionSpaceId = dto.attentionSpaceId;
      if (dto.associatedAppointmentId !== undefined) newEntryData.associatedAppointmentId = dto.associatedAppointmentId;
      // ...
      const newEntry = queryRunner.manager.create(ClinicalRecordEntry, newEntryData);
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
          await queryRunner.manager.save(ClinicalRecordDiagnosis, diagnosis); 
        }
      }

      if (dto.prescriptions && dto.prescriptions.length > 0) {
        for (const presDto of dto.prescriptions) {
          const prescriptionEntity = queryRunner.manager.create(Prescription, {
            clinicalRecordEntryId: savedEntry.id, // O clinicalRecordEntry: savedEntry
            prescriptionDate: new Date(presDto.prescriptionDate),
          });
          const savedPrescription = await queryRunner.manager.save(Prescription, prescriptionEntity);

          for (const medDto of presDto.medications) {
            const presExists = await this.medPresentationRepository.findOneBy({id: medDto.medicationPresentationId});
            if(!presExists) throw new BadRequestException(`Presentación de medicamento ID ${medDto.medicationPresentationId} no válida.`);
            const medDetail = queryRunner.manager.create(PrescriptionMedicationDetail, {
              prescriptionId: savedPrescription.id, // O prescription: savedPrescription
              medicationPresentationId: medDto.medicationPresentationId,
              indicatedDose: medDto.indicatedDose,
              indicatedFrequency: medDto.indicatedFrequency,
              indicatedTreatmentDuration: medDto.indicatedTreatmentDuration,
            });
            await queryRunner.manager.save(PrescriptionMedicationDetail, medDetail);
          }
        }
      }

      
      if (dto.examResults && dto.examResults.length > 0) {
        for (const examDto of dto.examResults) {
            const examResultEntity = queryRunner.manager.create(ExamResult, {
                clinicalRecordEntryId: savedEntry.id, // O clinicalRecordEntry: savedEntry
                generalExamName: examDto.generalExamName,
                resultIssueDate: examDto.resultIssueDate ? new Date(examDto.resultIssueDate) : null,
            });
            const savedExamResult = await queryRunner.manager.save(ExamResult, examResultEntity);

            for(const paramDto of examDto.parameters) {
                const paramExists = await this.examParameterRepository.findOneBy({id: paramDto.examParameterId});
                if(!paramExists) throw new BadRequestException(`Parámetro de exámen ID ${paramDto.examParameterId} no válido.`);
                const examParamDetail = queryRunner.manager.create(ExamResultDetail, {
                    examResultId: savedExamResult.id, // O examResult: savedExamResult
                    examParameterId: paramDto.examParameterId,
                    obtainedValue: paramDto.obtainedValue,
                });
                await queryRunner.manager.save(ExamResultDetail, examParamDetail);
            }
        }
      }

   
      if (dto.attachments && dto.attachments.length > 0) {
        for (const attachDto of dto.attachments) {
          const attachment = queryRunner.manager.create(ClinicalRecordAttachment, {
            clinicalRecordEntryId: savedEntry.id, // O clinicalRecordEntry: savedEntry
            originalFileName: attachDto.originalFileName,
            mimeType: attachDto.mimeType,
            storagePath: attachDto.storagePath,
          });
          await queryRunner.manager.save(ClinicalRecordAttachment, attachment);
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
         }
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al crear entrada clínica con detalles:', error); 

      if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof ForbiddenException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno al crear la entrada del historial clínico.');
    } finally {
      await queryRunner.release();
    }
  
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
      // 1. Encontrar la entrada de historial existente para asegurar que pertenece al paciente
      // y para tener acceso a sus colecciones existentes si es necesario (para eliminar).
      // Es importante cargar las relaciones que vas a reemplazar.
      const recordEntry = await queryRunner.manager.findOne(ClinicalRecordEntry, {
        where: { id: entryId, patientUserId: patientId },
        relations: ['diagnoses', 'prescriptions', 'prescriptions.medicationDetails', 'examResults', 'examResults.parameterDetails', 'attachments'],
      });

      if (!recordEntry) {
        await queryRunner.rollbackTransaction(); // No olvides rollback en fallos tempranos
        throw new NotFoundException(`Entrada de historial con ID ${entryId} para el paciente ${patientId} no encontrada.`);
      }

      // 2. Actualizar campos directos de la entidad ClinicalRecordEntry
      // Preparamos un objeto solo con los campos directos que vienen en el DTO
      const fieldsToUpdate: Partial<ClinicalRecordEntry> = {};
      if (updateDto.attentionHealthEntityId !== undefined) fieldsToUpdate.attentionHealthEntityId = updateDto.attentionHealthEntityId;
      if (updateDto.attentionSpaceId !== undefined) fieldsToUpdate.attentionSpaceId = updateDto.attentionSpaceId;
      if (updateDto.associatedAppointmentId !== undefined) fieldsToUpdate.associatedAppointmentId = updateDto.associatedAppointmentId;
      if (updateDto.eventTypeId !== undefined) fieldsToUpdate.eventTypeId = updateDto.eventTypeId;
      if (updateDto.attentionStartDateTime !== undefined) fieldsToUpdate.attentionStartDateTime = new Date(updateDto.attentionStartDateTime);
      if (updateDto.narrativeSummary !== undefined) fieldsToUpdate.narrativeSummary = updateDto.narrativeSummary;

      // Solo actualizamos si hay algo que actualizar en los campos directos
      if (Object.keys(fieldsToUpdate).length > 0) {
        await queryRunner.manager.update(ClinicalRecordEntry, entryId, fieldsToUpdate);
      }

      // 3. Manejar colecciones de detalles (Reemplazo completo)

      // Diagnósticos
      if (updateDto.diagnoses !== undefined) {
        // Eliminar diagnósticos existentes para esta entrada
        // Es más seguro eliminar por la FK a la entrada principal
        await queryRunner.manager.delete(ClinicalRecordDiagnosis, { clinicalRecordEntryId: entryId });
        // Crear nuevos diagnósticos
        for (const diagDto of updateDto.diagnoses) {
          const codeExists = await this.diagnosisCodeRepository.findOneBy({ cieCode: diagDto.cieCode });
          if (!codeExists) throw new BadRequestException(`Código CIE ${diagDto.cieCode} no válido.`);
          const diagnosis = queryRunner.manager.create(ClinicalRecordDiagnosis, {
            clinicalRecordEntryId: entryId, // Usar el ID de la entrada principal
            // clinicalRecordEntry: recordEntry, // Alternativamente, pero con el ID es suficiente si la relación está bien
            cieCode: diagDto.cieCode,
            diagnosisType: diagDto.diagnosisType,
          });
          await queryRunner.manager.save(ClinicalRecordDiagnosis, diagnosis);
        }
      }

      // Prescripciones
      if (updateDto.prescriptions !== undefined) {
        // Eliminar detalles de medicamentos de prescripciones existentes de esta entrada de historial
        const existingPrescriptions = await queryRunner.manager.find(Prescription, { where: { clinicalRecordEntryId: entryId } });
        for (const pres of existingPrescriptions) {
          await queryRunner.manager.delete(PrescriptionMedicationDetail, { prescriptionId: pres.id });
        }
        // Eliminar las prescripciones existentes
        await queryRunner.manager.delete(Prescription, { clinicalRecordEntryId: entryId });
        // Crear nuevas prescripciones y sus detalles
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
              prescriptionId: savedPrescription.id,
              medicationPresentationId: medDto.medicationPresentationId,
              indicatedDose: medDto.indicatedDose,
              indicatedFrequency: medDto.indicatedFrequency,
              indicatedTreatmentDuration: medDto.indicatedTreatmentDuration,
            });
            await queryRunner.manager.save(PrescriptionMedicationDetail, medDetail);
          }
        }
      }

     
      if (updateDto.examResults !== undefined) {
        const existingExamResults = await queryRunner.manager.find(ExamResult, { where: { clinicalRecordEntryId: entryId }});
        for (const examRes of existingExamResults) {
            await queryRunner.manager.delete(ExamResultDetail, { examResultId: examRes.id });
        }
        await queryRunner.manager.delete(ExamResult, { clinicalRecordEntryId: entryId });
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
                    examResultId: savedExamResult.id,
                    examParameterId: paramDto.examParameterId, 
                    obtainedValue: paramDto.obtainedValue,
                });
                await queryRunner.manager.save(ExamResultDetail, examParamDetail);
            }
        }
      }

 
       if (updateDto.attachments !== undefined) {
        
        await queryRunner.manager.delete(ClinicalRecordAttachment, { clinicalRecordEntryId: entryId });
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

    } catch (error) {
  await queryRunner.rollbackTransaction();
  throw new InternalServerErrorException({
    message: 'Error en createEntry',
    detail: error.message,
    stack: error.stack,
  });
    }
  }
  async createEntryMalvada(
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
        narrativeSummary: 'hardo',
        };
      if (dto.attentionSpaceId !== undefined) newEntryData.attentionSpaceId = dto.attentionSpaceId;
      if (dto.associatedAppointmentId !== undefined) newEntryData.associatedAppointmentId = dto.associatedAppointmentId;
      
      const newEntry = queryRunner.manager.create(ClinicalRecordEntry, newEntryData);
      const savedEntry = await queryRunner.manager.save(newEntry); 

    
      if (dto.diagnoses && dto.diagnoses.length > 0) {
        for (const diagDto of dto.diagnoses) {
          const codeExists = await this.diagnosisCodeRepository.findOneBy({ cieCode: diagDto.cieCode });
          if (!codeExists) throw new BadRequestException(`Código CIE ${diagDto.cieCode} no válido.`);
          const diagnosis = queryRunner.manager.create(ClinicalRecordDiagnosis, {
            clinicalRecordEntryId: savedEntry.id, 
            cieCode: diagDto.cieCode,
            diagnosisType: 'Secundario',
          });
          await queryRunner.manager.save(ClinicalRecordDiagnosis, diagnosis); 
        }
      }

      if (dto.prescriptions && dto.prescriptions.length > 0) {
        for (const presDto of dto.prescriptions) {
          const prescriptionEntity = queryRunner.manager.create(Prescription, {
            clinicalRecordEntryId: savedEntry.id, // O clinicalRecordEntry: savedEntry
            prescriptionDate: '2023-12-12',
          });
          const savedPrescription = await queryRunner.manager.save(Prescription, prescriptionEntity);

          for (const medDto of presDto.medications) {
            const presExists = await this.medPresentationRepository.findOneBy({id: medDto.medicationPresentationId});
            if(!presExists) throw new BadRequestException(`Presentación de medicamento ID ${medDto.medicationPresentationId} no válida.`);
            const medDetail = queryRunner.manager.create(PrescriptionMedicationDetail, {
              prescriptionId: savedPrescription.id, // O prescription: savedPrescription
              medicationPresentationId: medDto.medicationPresentationId,
              indicatedDose: medDto.indicatedDose,
              indicatedFrequency: '-900000000000000000000000000000',
              indicatedTreatmentDuration: 'hasta que te mueras',
            });
            await queryRunner.manager.save(PrescriptionMedicationDetail, medDetail);
          }
        }
      }

      
      if (dto.examResults && dto.examResults.length > 0) {
        for (const examDto of dto.examResults) {
            const examResultEntity = queryRunner.manager.create(ExamResult, {
                clinicalRecordEntryId: savedEntry.id, 
                generalExamName: examDto.generalExamName,
                resultIssueDate: examDto.resultIssueDate ? new Date(examDto.resultIssueDate) : null,
            });
            const savedExamResult = await queryRunner.manager.save(ExamResult, examResultEntity);

            for(const paramDto of examDto.parameters) {
                const paramExists = await this.examParameterRepository.findOneBy({id: paramDto.examParameterId});
                if(!paramExists) throw new BadRequestException(`Parámetro de exámen ID ${paramDto.examParameterId} no válido.`);
                const examParamDetail = queryRunner.manager.create(ExamResultDetail, {
                    examResultId: savedExamResult.id, // O examResult: savedExamResult
                    examParameterId: paramDto.examParameterId,
                    obtainedValue: '950000000 g por diaaaaaaaaaa',
                });
                await queryRunner.manager.save(ExamResultDetail, examParamDetail);
            }
        }
      }

   
      if (dto.attachments && dto.attachments.length > 0) {
        for (const attachDto of dto.attachments) {
          const attachment = queryRunner.manager.create(ClinicalRecordAttachment, {
            clinicalRecordEntryId: savedEntry.id,
            originalFileName: 'EstePaciente esta condenado, no intenten salvarlo',
            mimeType: 'Pasar QR de rescate',
            storagePath: 'Cuenta de Ingeniero Maurico Quezada',
          });
          await queryRunner.manager.save(ClinicalRecordAttachment, attachment);
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
         }
      });

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error al crear entrada clínica con detalles:', error); 

      if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof ForbiddenException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno al crear la entrada del historial clínico.');
    } finally {
      await queryRunner.release();
    }
  
  }

}




