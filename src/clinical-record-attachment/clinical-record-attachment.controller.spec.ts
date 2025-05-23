import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalRecordAttachmentController } from './clinical-record-attachment.controller';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';

describe('ClinicalRecordAttachmentController', () => {
  let controller: ClinicalRecordAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalRecordAttachmentController],
      providers: [ClinicalRecordAttachmentService],
    }).compile();

    controller = module.get<ClinicalRecordAttachmentController>(ClinicalRecordAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
