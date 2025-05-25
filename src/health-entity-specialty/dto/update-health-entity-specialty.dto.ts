import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthEntitySpecialtyDto } from './create-health-entity-specialty.dto';

export class UpdateHealthEntitySpecialtyDto extends PartialType(CreateHealthEntitySpecialtyDto) {}
