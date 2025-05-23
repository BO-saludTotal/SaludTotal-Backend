import { Module } from '@nestjs/common';
import { GeneralMedicationService } from './general-medication.service';
import { GeneralMedicationController } from './general-medication.controller';

@Module({
  controllers: [GeneralMedicationController],
  providers: [GeneralMedicationService],
})
export class GeneralMedicationModule {}
