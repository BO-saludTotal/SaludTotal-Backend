import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { ClinicalRecordAttachmentController } from './clinical-record-attachment.controller';
import { ClinicalRecordAttachment } from '../entity/clinicalRecordAttachment';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry'; 
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ClinicalRecordAttachment, ClinicalRecordEntry]),
    
  ],
  controllers: [ClinicalRecordAttachmentController],
  providers: [ClinicalRecordAttachmentService],
  exports: [ClinicalRecordAttachmentService]
})
export class ClinicalRecordAttachmentModule {}