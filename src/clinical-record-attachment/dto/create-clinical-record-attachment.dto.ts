import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateClinicalRecordAttachmentDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  clinicalRecordEntry: number;
}
