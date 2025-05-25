import { Test, TestingModule } from '@nestjs/testing';
import { AuditActionTypeService } from './audit-action-type.service';

describe('AuditActionTypeService', () => {
  let service: AuditActionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditActionTypeService],
    }).compile();

    service = module.get<AuditActionTypeService>(AuditActionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
