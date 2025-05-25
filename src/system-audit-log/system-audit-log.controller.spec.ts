import { Test, TestingModule } from '@nestjs/testing';
import { SystemAuditLogController } from './system-audit-log.controller';
import { SystemAuditLogService } from './system-audit-log.service';

describe('SystemAuditLogController', () => {
  let controller: SystemAuditLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemAuditLogController],
      providers: [SystemAuditLogService],
    }).compile();

    controller = module.get<SystemAuditLogController>(SystemAuditLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
