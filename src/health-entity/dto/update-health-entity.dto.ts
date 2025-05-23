import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthEntityDto } from './create-health-entity.dto';

export class UpdateHealthEntityDto extends PartialType(CreateHealthEntityDto) {}
