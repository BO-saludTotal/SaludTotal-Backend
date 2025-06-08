import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordDiagnosisDto } from './create-diagnosis-code.dto';

export class UpdateClinicalRecordDiagnosisDto extends PartialType(CreateClinicalRecordDiagnosisDto) {}