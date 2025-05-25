import { Module } from '@nestjs/common';
import { ClinicalRecordDiagnosisService } from './clinical-record-diagnosis.service';
import { ClinicalRecordDiagnosisController } from './clinical-record-diagnosis.controller';

@Module({
  controllers: [ClinicalRecordDiagnosisController],
  providers: [ClinicalRecordDiagnosisService],
})
export class ClinicalRecordDiagnosisModule {}
