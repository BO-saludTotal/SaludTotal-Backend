import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeStaffDetailService } from './administrative-staff-detail.service';

describe('AdministrativeStaffDetailService', () => {
  let service: AdministrativeStaffDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrativeStaffDetailService],
    }).compile();

    service = module.get<AdministrativeStaffDetailService>(AdministrativeStaffDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
