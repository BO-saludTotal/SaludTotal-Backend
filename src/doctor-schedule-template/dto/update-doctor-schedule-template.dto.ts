import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorScheduleTemplateDto } from './create-doctor-schedule-template.dto';

export class UpdateDoctorScheduleTemplateDto extends PartialType(CreateDoctorScheduleTemplateDto) {}
