import { Module } from '@nestjs/common';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { ClinicalRecordAttachmentController } from './clinical-record-attachment.controller';
import { ClinicalRecordAttachment } from 'src/entity/clinicalRecordAttachment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicalRecordAttachment]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [ClinicalRecordAttachmentController],
  providers: [ClinicalRecordAttachmentService],
  exports: [ClinicalRecordAttachmentService, TypeOrmModule],
})
export class ClinicalRecordAttachmentModule {}
