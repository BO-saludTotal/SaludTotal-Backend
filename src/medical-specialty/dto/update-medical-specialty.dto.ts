import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalSpecialtyDto } from './create-medical-specialty.dto';

export class UpdateMedicalSpecialtyDto extends PartialType(CreateMedicalSpecialtyDto) {}
