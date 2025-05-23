import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHealthEntityAffiliationService } from './doctor-health-entity-affiliation.service';

describe('DoctorHealthEntityAffiliationService', () => {
  let service: DoctorHealthEntityAffiliationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorHealthEntityAffiliationService],
    }).compile();

    service = module.get<DoctorHealthEntityAffiliationService>(DoctorHealthEntityAffiliationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
