import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClinicalRecordAttachmentDto {
  @IsNumber()
  recordEntryId: number;

  @IsOptional()
  @IsString()
  originalFilename?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsNotEmpty()
  @IsString()
  storagePath: string;
}
