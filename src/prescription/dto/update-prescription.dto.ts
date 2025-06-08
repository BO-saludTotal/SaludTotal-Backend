
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsDateString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionDto } from './create-prescription.dto';
import { CreatePrescriptionMedicationDetailDto } from 'src/prescription-medication-detail/dto/create-prescription-medication-detail.dto';


export class UpdatePrescriptionDateDto {
    @IsOptional()
    @IsDateString({}, { message: 'La fecha de la prescripción debe ser una fecha válida.'})
    prescriptionDate?: string;
}


export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {}