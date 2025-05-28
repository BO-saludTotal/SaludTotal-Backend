import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClinicalRecordDiagnosisDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  @IsString()
  patientUserId: string;
  @IsNotEmpty()
  @IsString()
  doctorUserId: string;
  @IsNumber()
  @IsNotEmpty()
  healthEntityId: number;
  @IsNumber()
  @IsOptional()
  spaceId: number | null;
  @IsNumber()
  @IsOptional()
  appointmentId: number | null;
  @IsNumber()
  @IsNotEmpty()
  eventTypeId: number;
  @IsNotEmpty()
  @IsDate()
  attentionStartDateTime: Date;
  @IsOptional()
  @IsString()
  narrativeSummary: string | null;
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
