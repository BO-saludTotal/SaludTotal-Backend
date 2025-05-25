import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordEntryService } from './clinical-record-entry.service';

describe('ClinicalRecordEntryService', () => {
  let service: ClinicalRecordEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalRecordEntryService],
    }).compile();

    service = module.get<ClinicalRecordEntryService>(ClinicalRecordEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
