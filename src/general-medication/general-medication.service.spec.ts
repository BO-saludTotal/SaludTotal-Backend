import { Test, TestingModule } from '@nestjs/testing';
import { GeneralMedicationService } from './general-medication.service';

describe('GeneralMedicationService', () => {
  let service: GeneralMedicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralMedicationService],
    }).compile();

    service = module.get<GeneralMedicationService>(GeneralMedicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
