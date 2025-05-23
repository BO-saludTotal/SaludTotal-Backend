import { Module } from '@nestjs/common';
import { PrescriptionMedicationDetailService } from './prescription-medication-detail.service';
import { PrescriptionMedicationDetailController } from './prescription-medication-detail.controller';

@Module({
  controllers: [PrescriptionMedicationDetailController],
  providers: [PrescriptionMedicationDetailService],
})
export class PrescriptionMedicationDetailModule {}
