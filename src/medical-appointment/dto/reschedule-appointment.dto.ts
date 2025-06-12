
import { IsNotEmpty, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class RescheduleAppointmentDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  newSlotId: number;

  @IsOptional()
  @IsString()
  reason?: string;
}