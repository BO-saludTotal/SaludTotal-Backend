import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionMedicationDetailController } from './prescription-medication-detail.controller';
import { PrescriptionMedicationDetailService } from './prescription-medication-detail.service';

describe('PrescriptionMedicationDetailController', () => {
  let controller: PrescriptionMedicationDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionMedicationDetailController],
      providers: [PrescriptionMedicationDetailService],
    }).compile();

    controller = module.get<PrescriptionMedicationDetailController>(PrescriptionMedicationDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
