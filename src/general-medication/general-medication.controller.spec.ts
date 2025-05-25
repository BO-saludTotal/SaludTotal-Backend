import { Test, TestingModule } from '@nestjs/testing';
import { GeneralMedicationController } from './general-medication.controller';
import { GeneralMedicationService } from './general-medication.service';

describe('GeneralMedicationController', () => {
  let controller: GeneralMedicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralMedicationController],
      providers: [GeneralMedicationService],
    }).compile();

    controller = module.get<GeneralMedicationController>(GeneralMedicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
