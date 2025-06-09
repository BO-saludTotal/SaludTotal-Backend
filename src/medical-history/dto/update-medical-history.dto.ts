import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordEntryDto } from 'src/clinical-record-entry/dto/create-clinical-record-entry.dto';

export class UpdateMedicalHistoryDto extends PartialType(
  CreateClinicalRecordEntryDto,
) {}
