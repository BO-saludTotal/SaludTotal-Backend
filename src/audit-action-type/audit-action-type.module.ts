import { Module } from '@nestjs/common';
import { AuditActionTypeService } from './audit-action-type.service';
import { AuditActionTypeController } from './audit-action-type.controller';

@Module({
  controllers: [AuditActionTypeController],
  providers: [AuditActionTypeService],
})
export class AuditActionTypeModule {}
