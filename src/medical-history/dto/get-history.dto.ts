import { IsNumber, IsOptional } from 'class-validator';

export class GetHistoryDto {
  @IsOptional()
  @IsNumber()
  medicalEventType?: number;
}
