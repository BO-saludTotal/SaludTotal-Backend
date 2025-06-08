import { IsNotEmpty, IsDateString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionMedicationDetailDto } from 'src/prescription-medication-detail/dto/create-prescription-medication-detail.dto';

export class CreatePrescriptionDto {
  @IsNotEmpty({ message: 'La fecha de la prescripción es requerida.' })
  @IsDateString({}, { message: 'La fecha de la prescripción debe ser una fecha válida.'})
  prescriptionDate: string; 

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'Se debe prescribir al menos un medicamento.'})
  @Type(() => CreatePrescriptionMedicationDetailDto)
  medications: CreatePrescriptionMedicationDetailDto[];

}