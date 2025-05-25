import { PartialType } from '@nestjs/mapped-types';
import { CreateAuditActionTypeDto } from './create-audit-action-type.dto';

export class UpdateAuditActionTypeDto extends PartialType(CreateAuditActionTypeDto) {}
