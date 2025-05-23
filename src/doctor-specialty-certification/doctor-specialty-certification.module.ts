import { Module } from '@nestjs/common';
import { DoctorSpecialtyCertificationService } from './doctor-specialty-certification.service';
import { DoctorSpecialtyCertificationController } from './doctor-specialty-certification.controller';

@Module({
  controllers: [DoctorSpecialtyCertificationController],
  providers: [DoctorSpecialtyCertificationService],
})
export class DoctorSpecialtyCertificationModule {}
