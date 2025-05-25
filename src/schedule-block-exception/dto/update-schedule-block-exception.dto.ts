import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleBlockExceptionDto } from './create-schedule-block-exception.dto';

export class UpdateScheduleBlockExceptionDto extends PartialType(CreateScheduleBlockExceptionDto) {}
