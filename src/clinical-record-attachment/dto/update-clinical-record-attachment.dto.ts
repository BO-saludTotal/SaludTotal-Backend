import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateClinicalRecordAttachmentDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  originalFileName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  mimeType?: string;

}