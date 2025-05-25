import { Module } from '@nestjs/common';
import { ClinicalRecordEntryService } from './clinical-record-entry.service';
import { ClinicalRecordEntryController } from './clinical-record-entry.controller';

@Module({
  controllers: [ClinicalRecordEntryController],
  providers: [ClinicalRecordEntryService],
})
export class ClinicalRecordEntryModule {}
