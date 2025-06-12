
import { IsNotEmpty, IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class CreateMedicalAppointmentDto {
  @IsNotEmpty({ message: 'El ID del slot de disponibilidad es requerido.' })
  @IsInt({ message: 'El ID del slot debe ser un número entero.' })
  @Min(1, { message: 'El ID del slot debe ser un número positivo.' })
  slotId: number; 

  @IsOptional()
  @IsString({ message: 'El motivo de la consulta debe ser texto.'})
  @MaxLength(1000, { message: 'El motivo de la consulta no puede exceder los 1000 caracteres.'})
  patientReason?: string; 
}