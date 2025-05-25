import { Injectable } from '@nestjs/common';
import { CreateClinicalRecordAttachmentDto } from './dto/create-clinical-record-attachment.dto';
import { UpdateClinicalRecordAttachmentDto } from './dto/update-clinical-record-attachment.dto';

@Injectable()
export class ClinicalRecordAttachmentService {
  create(createClinicalRecordAttachmentDto: CreateClinicalRecordAttachmentDto) {
    return 'This action adds a new clinicalRecordAttachment';
  }

  findAll() {
    return `This action returns all clinicalRecordAttachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalRecordAttachment`;
  }

  update(id: number, updateClinicalRecordAttachmentDto: UpdateClinicalRecordAttachmentDto) {
    return `This action updates a #${id} clinicalRecordAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalRecordAttachment`;
  }
}
