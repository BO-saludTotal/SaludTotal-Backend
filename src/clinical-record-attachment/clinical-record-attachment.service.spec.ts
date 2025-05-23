import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';

describe('ClinicalRecordAttachmentService', () => {
  let service: ClinicalRecordAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalRecordAttachmentService],
    }).compile();

    service = module.get<ClinicalRecordAttachmentService>(ClinicalRecordAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
