import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralMedicationDto } from './create-general-medication.dto';

export class UpdateGeneralMedicationDto extends PartialType(CreateGeneralMedicationDto) {}
