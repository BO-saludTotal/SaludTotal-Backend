import { Test, TestingModule } from '@nestjs/testing';
import { AuditActionTypeController } from './audit-action-type.controller';
import { AuditActionTypeService } from './audit-action-type.service';

describe('AuditActionTypeController', () => {
  let controller: AuditActionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditActionTypeController],
      providers: [AuditActionTypeService],
    }).compile();

    controller = module.get<AuditActionTypeController>(AuditActionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
