import { Test, TestingModule } from '@nestjs/testing';
import { GovernmentStaffDetailService } from './government-staff-detail.service';

describe('GovernmentStaffDetailService', () => {
  let service: GovernmentStaffDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovernmentStaffDetailService],
    }).compile();

    service = module.get<GovernmentStaffDetailService>(GovernmentStaffDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
