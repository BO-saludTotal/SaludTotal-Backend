import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordDiagnosisController } from './clinical-record-diagnosis.controller';
import { ClinicalRecordDiagnosisService } from './clinical-record-diagnosis.service';

describe('ClinicalRecordDiagnosisController', () => {
  let controller: ClinicalRecordDiagnosisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalRecordDiagnosisController],
      providers: [ClinicalRecordDiagnosisService],
    }).compile();

    controller = module.get<ClinicalRecordDiagnosisController>(ClinicalRecordDiagnosisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
