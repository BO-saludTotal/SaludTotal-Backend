
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsDateString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExamResultParameterDto } from 'src/clinical-record-entry/dto/create-clinical-record-entry.dto';

export class CreateExamResultDto {
  @IsNotEmpty({ message: 'El nombre general del examen es requerido.'})
  @IsString()
  @MaxLength(255)
  generalExamName: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de emisión del resultado debe ser una fecha válida.'})
  resultIssueDate?: string; // o Date

  @IsArray({ message: 'Se debe incluir al menos un parámetro para el resultado del exámen.'})
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'Se debe incluir al menos un parámetro para el resultado del exámen.'})
  @Type(() => CreateExamResultParameterDto)
  parameters: CreateExamResultParameterDto[];


}