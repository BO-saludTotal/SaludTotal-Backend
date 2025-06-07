
import { PartialType } from '@nestjs/mapped-types'; 
import { CreateClinicalRecordEntryDto } from './create-medical-history.dto';

export class UpdateMedicalHistoryDto extends PartialType(CreateClinicalRecordEntryDto) {}
