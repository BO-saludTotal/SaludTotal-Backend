import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalRecordDiagnosisService } from './diagnosis-code.service';
import { ClinicalRecordDiagnosisController } from './diagnosis-code.controller';
import { ClinicalRecordDiagnosis } from '../entity/clinicalRecordDiagnosis';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry'; 
import { DiagnosisCode } from '../entity/diagnosisCode';     
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ClinicalRecordDiagnosis,
      ClinicalRecordEntry,
      DiagnosisCode,
    ]),
  ],
  controllers: [ClinicalRecordDiagnosisController],
  providers: [ClinicalRecordDiagnosisService],
  exports: [ClinicalRecordDiagnosisService] 
})
export class ClinicalRecordDiagnosisModule {}