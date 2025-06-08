import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { ClinicalRecordAttachmentController } from './clinical-record-attachment.controller';
import { ClinicalRecordAttachment } from '../entity/clinicalRecordAttachment';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry'; 
import { AuthModule } from 'src/auth/auth.module';
// import { MulterModule } from '@nestjs/platform-express'; // Para subida de archivos

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ClinicalRecordAttachment, ClinicalRecordEntry]),
    // MulterModule.register({ dest: './uploads' }), // Configuración básica de Multer para guardar en ./uploads
  ],
  controllers: [ClinicalRecordAttachmentController],
  providers: [ClinicalRecordAttachmentService],
  exports: [ClinicalRecordAttachmentService]
})
export class ClinicalRecordAttachmentModule {}