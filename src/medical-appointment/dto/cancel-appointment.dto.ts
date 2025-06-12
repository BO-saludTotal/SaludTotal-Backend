
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CancelAppointmentDto {
  @IsNotEmpty({ message: 'El motivo de la cancelación es requerido.'})
  @IsString()
  @MaxLength(500, {message: 'El motivo no puede exceder los 500 caracteres.'})
  reason: string;
}