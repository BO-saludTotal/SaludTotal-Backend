import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { Prescription } from '../entity/prescription';
import { PrescriptionMedicationDetail } from '../entity/prescriptionMedicationDetail';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { CommercialMedicationPresentation } from '../entity/commercialMedicationPresentation';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Prescription,
      PrescriptionMedicationDetail,
      ClinicalRecordEntry,
      CommercialMedicationPresentation,
    ]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService] 
})
export class PrescriptionModule {}