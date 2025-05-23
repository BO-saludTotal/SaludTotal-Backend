import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionMedicationDetailService } from './prescription-medication-detail.service';

describe('PrescriptionMedicationDetailService', () => {
  let service: PrescriptionMedicationDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionMedicationDetailService],
    }).compile();

    service = module.get<PrescriptionMedicationDetailService>(PrescriptionMedicationDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
