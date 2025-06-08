import { IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';
import { DiagnosisType } from '../../entity/clinicalRecordDiagnosis'; 
import { DiagnosisCode } from 'src/entity/diagnosisCode';

export class CreateClinicalRecordDiagnosisDto {
  @IsNotEmpty()
  @IsString({ message: 'El código CIE es requerido y debe ser texto.'})
  cieCode: string; 

  @IsNotEmpty()
  @IsEnum(DiagnosisCode, { message: 'Tipo de diagnóstico inválido.'}) 
  diagnosisType: DiagnosisType;


}