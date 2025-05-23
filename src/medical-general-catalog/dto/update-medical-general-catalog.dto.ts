import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalGeneralCatalogDto } from './create-medical-general-catalog.dto';

export class UpdateMedicalGeneralCatalogDto extends PartialType(CreateMedicalGeneralCatalogDto) {}
