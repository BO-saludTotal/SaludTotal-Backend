import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordEntryDto } from './create-clinical-record-entry.dto';

export class UpdateClinicalRecordEntryDto extends PartialType(CreateClinicalRecordEntryDto) {}
