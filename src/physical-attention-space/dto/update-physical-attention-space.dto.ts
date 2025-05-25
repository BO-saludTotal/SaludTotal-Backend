import { PartialType } from '@nestjs/mapped-types';
import { CreatePhysicalAttentionSpaceDto } from './create-physical-attention-space.dto';

export class UpdatePhysicalAttentionSpaceDto extends PartialType(CreatePhysicalAttentionSpaceDto) {}
