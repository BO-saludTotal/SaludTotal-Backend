import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateMedicalEventTypeDto {
  @IsNotEmpty({ message: 'El nombre del tipo de evento es requerido.' })
  @IsString()
  @MaxLength(150)
  eventTypeName: string; 

  @IsOptional()
  @IsString()
  description?: string; 
}