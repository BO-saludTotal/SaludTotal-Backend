import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentChangeHistoryDto } from './create-appointment-change-history.dto';

export class UpdateAppointmentChangeHistoryDto extends PartialType(CreateAppointmentChangeHistoryDto) {}
