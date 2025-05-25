import { Test, TestingModule } from '@nestjs/testing';
import { DoctorSpecialtyCertificationService } from './doctor-specialty-certification.service';

describe('DoctorSpecialtyCertificationService', () => {
  let service: DoctorSpecialtyCertificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorSpecialtyCertificationService],
    }).compile();

    service = module.get<DoctorSpecialtyCertificationService>(DoctorSpecialtyCertificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
