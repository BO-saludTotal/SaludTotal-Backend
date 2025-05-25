import { Module } from '@nestjs/common';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { ClinicalRecordAttachmentController } from './clinical-record-attachment.controller';

@Module({
  controllers: [ClinicalRecordAttachmentController],
  providers: [ClinicalRecordAttachmentService],
})
export class ClinicalRecordAttachmentModule {}
