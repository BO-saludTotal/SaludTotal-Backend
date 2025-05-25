import { Test, TestingModule } from '@nestjs/testing';
import { HealthEntitySpecialtyService } from './health-entity-specialty.service';

describe('HealthEntitySpecialtyService', () => {
  let service: HealthEntitySpecialtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthEntitySpecialtyService],
    }).compile();

    service = module.get<HealthEntitySpecialtyService>(HealthEntitySpecialtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
