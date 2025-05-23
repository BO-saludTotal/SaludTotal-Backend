import { Module } from '@nestjs/common';
import { PatientDetailsService } from './patient-details.service';
import { PatientDetailsController } from './patient-details.controller';

@Module({
  controllers: [PatientDetailsController],
  providers: [PatientDetailsService],
})
export class PatientDetailsModule {}
