
import { IsOptional, IsInt, IsString, IsDateString, Min, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer'; // Type también puede ayudar con la transformación a número

export class SearchAvailableSlotsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El ID de la entidad de salud debe ser un número entero.' })
  @Min(1, { message: 'healthEntityId must not be less than 1.' })
  healthEntityId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El ID de la especialidad debe ser un número entero.' })
  @Min(1, { message: 'specialtyId must not be less than 1.' })
  specialtyId?: number;

  @IsOptional()
  @IsUUID('4', { message: 'El ID del médico debe ser un UUID válido.' })
  doctorId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha "desde" debe ser una fecha válida en formato ISO.' })
  dateFrom?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha "hasta" debe ser una fecha válida en formato ISO.' })
  dateTo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El ID del tipo de atención debe ser un número entero.' })
  @Min(1, { message: 'attentionTypeId must not be less than 1.' })
  attentionTypeId?: number;
}