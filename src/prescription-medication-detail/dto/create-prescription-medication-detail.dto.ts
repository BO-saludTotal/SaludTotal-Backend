import { IsNotEmpty, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePrescriptionMedicationDetailDto {
  @IsNotEmpty({ message: 'El ID de la presentación del medicamento es requerido.' })
  @IsInt({ message: 'El ID de la presentación del medicamento debe ser un número.' })
  medicationPresentationId: number; 

  @IsOptional()
  @IsString()
  @MaxLength(100)
  indicatedDose?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  indicatedFrequency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  indicatedTreatmentDuration?: string;
}