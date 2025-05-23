import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordDiagnosisService } from './clinical-record-diagnosis.service';

describe('ClinicalRecordDiagnosisService', () => {
  let service: ClinicalRecordDiagnosisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalRecordDiagnosisService],
    }).compile();

    service = module.get<ClinicalRecordDiagnosisService>(ClinicalRecordDiagnosisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
