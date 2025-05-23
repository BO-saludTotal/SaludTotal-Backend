import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalEventTypeDto } from './create-medical-event-type.dto';

export class UpdateMedicalEventTypeDto extends PartialType(CreateMedicalEventTypeDto) {}
