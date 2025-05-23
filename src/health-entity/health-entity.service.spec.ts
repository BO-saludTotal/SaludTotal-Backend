import { Test, TestingModule } from '@nestjs/testing';
import { HealthEntityService } from './health-entity.service';

describe('HealthEntityService', () => {
  let service: HealthEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthEntityService],
    }).compile();

    service = module.get<HealthEntityService>(HealthEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
