import { Module } from '@nestjs/common';
import { SystemAuditLogService } from './system-audit-log.service';
import { SystemAuditLogController } from './system-audit-log.controller';

@Module({
  controllers: [SystemAuditLogController],
  providers: [SystemAuditLogService],
})
export class SystemAuditLogModule {}
