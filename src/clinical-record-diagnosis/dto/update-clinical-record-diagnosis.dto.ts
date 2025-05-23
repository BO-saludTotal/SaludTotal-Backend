import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordDiagnosisDto } from './create-clinical-record-diagnosis.dto';

export class UpdateClinicalRecordDiagnosisDto extends PartialType(CreateClinicalRecordDiagnosisDto) {}
