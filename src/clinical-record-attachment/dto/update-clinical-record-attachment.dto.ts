import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicalRecordAttachmentDto } from './create-clinical-record-attachment.dto';

export class UpdateClinicalRecordAttachmentDto extends PartialType(CreateClinicalRecordAttachmentDto) {}
