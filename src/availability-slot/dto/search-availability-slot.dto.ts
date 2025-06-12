
import { IsOptional, IsInt, IsString, IsDateString, Min, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer'; 

export class SearchAvailableSlotsDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) 
  @IsInt({ message: 'El ID de la entidad de salud debe ser un número.' })
  @Min(1)
  healthEntityId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'El ID de la especialidad debe ser un número.' })
  @Min(1)
  specialtyId?: number;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del médico debe ser un UUID válido.'})
  doctorId?: string; 

  @IsOptional()
  @IsDateString({}, { message: 'La fecha "desde" debe ser una fecha válida en formato ISO.'})
  dateFrom?: string; 

  @IsOptional()
  @IsDateString({}, { message: 'La fecha "hasta" debe ser una fecha válida en formato ISO.'})
  dateTo?: string; 

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'El ID del tipo de atención debe ser un número.' })
  @Min(1)
  attentionTypeId?: number;


}