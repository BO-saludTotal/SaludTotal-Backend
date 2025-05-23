import { Module } from '@nestjs/common';
import { DoctorScheduleTemplateService } from './doctor-schedule-template.service';
import { DoctorScheduleTemplateController } from './doctor-schedule-template.controller';

@Module({
  controllers: [DoctorScheduleTemplateController],
  providers: [DoctorScheduleTemplateService],
})
export class DoctorScheduleTemplateModule {}
