import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
  MaxLength,
} from 'class-validator';

export class CreateClinicalRecordEntryDto {
  @IsNotEmpty({
    message:
      'El ID de la entidad de salud donde ocurrió la atención es requerido.',
  })
  @IsInt({ message: 'El ID de la entidad de salud debe ser un número entero.' })
  attentionHealthEntityId: number;

  @IsOptional()
  @IsInt({
    message: 'El ID del espacio físico de atención debe ser un número entero.',
  })
  attentionSpaceId?: number;

  @IsOptional()
  @IsInt({
    message: 'El ID de la cita médica asociada debe ser un número entero.',
  })
  associatedAppointmentId?: number;

  @IsNotEmpty({ message: 'El ID del tipo de evento médico es requerido.' })
  @IsInt({
    message: 'El ID del tipo de evento médico debe ser un número entero.',
  })
  eventTypeId: number;

  @IsNotEmpty({
    message: 'La fecha y hora de inicio de atención es requerida.',
  })
  @IsDateString(
    {},
    {
      message:
        'La fecha y hora de inicio de atención debe ser una fecha válida en formato ISO8601 (YYYY-MM-DDTHH:MM:SSZ).',
    },
  )
  attentionStartDateTime: string;

  @IsOptional()
  @IsString({ message: 'El resumen narrativo debe ser una cadena de texto.' })
  @MaxLength(5000, {
    message: 'El resumen narrativo no puede exceder los 5000 caracteres.',
  })
  narrativeSummary?: string;
}
