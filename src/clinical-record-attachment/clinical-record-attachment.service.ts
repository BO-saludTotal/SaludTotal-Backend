/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CreateClinicalRecordAttachmentDto } from './dto/create-clinical-record-attachment.dto';
import { UpdateClinicalRecordAttachmentDto } from './dto/update-clinical-record-attachment.dto';
import { ClinicalRecordAttachment } from 'src/entity/clinicalRecordAttachment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cloudinary } from 'src/cloudinary/cloudinary.config';
import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}
@Injectable()
export class ClinicalRecordAttachmentService {
  constructor(
    @InjectRepository(ClinicalRecordAttachment)
    private readonly clinicalRecordAttachmentRepository: Repository<ClinicalRecordAttachment>,
  ) {}

  async create(
    file: Express.Multer.File,
    createClinicalRecordAttachmentDto: CreateClinicalRecordAttachmentDto,
  ) {
    console.log('Cloudinary config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream: NodeJS.WritableStream =
          cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw',
              folder: 'clinical-attachments',
              public_id: `${Date.now()}-${file.originalname}`,
              type: 'upload',
            },
            (error, result) => {
              if (error)
                return reject(
                  error instanceof Error ? error : new Error(String(error)),
                );
              if (!result)
                return reject(
                  new Error('No upload result received from Cloudinary.'),
                );
              resolve(result);
            },
          );
        bufferToStream(file.buffer).pipe(uploadStream);
      },
    );
    const attachment = this.clinicalRecordAttachmentRepository.create({
      clinicalRecordEntryId:
        createClinicalRecordAttachmentDto.clinicalRecordEntry,
      originalFileName: file.originalname,
      mimeType: file.mimetype,
      storagePath: uploadResult.secure_url,
    });
    return this.clinicalRecordAttachmentRepository.save(attachment);
  }

  findAll() {
    return `This action returns all clinicalRecordAttachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalRecordAttachment`;
  }

  update(
    id: number,
    updateClinicalRecordAttachmentDto: UpdateClinicalRecordAttachmentDto,
  ) {
    console.log(updateClinicalRecordAttachmentDto);
    return `This action updates a #${id} clinicalRecordAttachment, `;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalRecordAttachment`;
  }
}
