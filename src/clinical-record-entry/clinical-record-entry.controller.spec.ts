import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordEntryController } from './clinical-record-entry.controller';
import { ClinicalRecordEntryService } from './clinical-record-entry.service';

describe('ClinicalRecordEntryController', () => {
  let controller: ClinicalRecordEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalRecordEntryController],
      providers: [ClinicalRecordEntryService],
    }).compile();

    controller = module.get<ClinicalRecordEntryController>(
      ClinicalRecordEntryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
