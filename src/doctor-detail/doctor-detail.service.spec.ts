import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDetailService } from './doctor-detail.service';

describe('DoctorDetailService', () => {
  let service: DoctorDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorDetailService],
    }).compile();

    service = module.get<DoctorDetailService>(DoctorDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
