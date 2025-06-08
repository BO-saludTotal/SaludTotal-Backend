import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordEntryDto } from '../medical-history.module';

export class UpdateMedicalHistoryDto extends PartialType(
  CreateClinicalRecordEntryDto,
) {}
