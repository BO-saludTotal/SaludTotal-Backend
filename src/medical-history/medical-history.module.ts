import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.service';
import { AuthModule } from '../auth/auth.module';

import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
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

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ClinicalRecordEntry,
      User,
      MedicalEventType,
      HealthEntity,
      PhysicalAttentionSpace,
      MedicalAppointment,
      ClinicalRecordDiagnosis,
      DiagnosisCode,
      Prescription,
      PrescriptionMedicationDetail,
      CommercialMedicationPresentation,
      GeneralMedication,
      ExamResult,
      ExamResultDetail,
      ExamParameter,
      ClinicalRecordAttachment,
    ]),
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
