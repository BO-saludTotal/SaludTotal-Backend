import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DiagnosisType } from 'src/entity/clinicalRecordDiagnosis';

export class CreateClinicalRecordDiagnosisDto {
  @IsNumber()
  @IsNotEmpty()
  recordEntryId: number;
  @IsString()
  @IsNotEmpty()
  diagnosisCode: string;
  @IsNotEmpty()
  diagnosisType: DiagnosisType;
}
