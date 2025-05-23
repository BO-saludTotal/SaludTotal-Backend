import { Module } from '@nestjs/common';
import { DoctorDetailService } from './doctor-detail.service';
import { DoctorDetailController } from './doctor-detail.controller';

@Module({
  controllers: [DoctorDetailController],
  providers: [DoctorDetailService],
})
export class DoctorDetailModule {}
