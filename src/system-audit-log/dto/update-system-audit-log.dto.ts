import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemAuditLogDto } from './create-system-audit-log.dto';

export class UpdateSystemAuditLogDto extends PartialType(CreateSystemAuditLogDto) {}
