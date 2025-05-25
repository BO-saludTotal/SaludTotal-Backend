import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionMedicationDetailDto } from './create-prescription-medication-detail.dto';

export class UpdatePrescriptionMedicationDetailDto extends PartialType(CreatePrescriptionMedicationDetailDto) {}
