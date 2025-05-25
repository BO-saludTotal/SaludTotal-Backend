import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosisCodeDto } from './create-diagnosis-code.dto';

export class UpdateDiagnosisCodeDto extends PartialType(CreateDiagnosisCodeDto) {}
