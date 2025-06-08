import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
  MaxLength,
  IsArray,
  ValidateNested,
  //IsNumber,
  IsEnum,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateDiagnosisDetailDto {
  @IsNotEmpty()
  @IsString()
  cieCode: string; // FK a DiagnosticosCIE_Catalogo

  @IsNotEmpty()
  @IsEnum(['Principal', 'Secundario', 'Presuntivo', 'Confirmado'])
  diagnosisType: 'Principal' | 'Secundario' | 'Presuntivo' | 'Confirmado';
}

export class CreatePrescriptionMedicationDto {
  @IsNotEmpty()
  @IsInt()
  medicationPresentationId: number; // FK a PresentacionesComercialesMedicamentos

  @IsOptional()
  @IsString()
  @MaxLength(100)
  indicatedDose?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  indicatedFrequency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  indicatedTreatmentDuration?: string;
}

export class CreatePrescriptionDetailDto {
  @IsNotEmpty()
  @IsDateString() // Opcional, o puede tomar la fecha de la entrada principal
  prescriptionDate: string; // Fecha de la prescripción

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionMedicationDto)
  medications: CreatePrescriptionMedicationDto[];
}

export class CreateExamResultParameterDto {
  @IsNotEmpty()
  @IsInt()
  examParameterId: number; // FK a ParametrosExamenCatalogo

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  obtainedValue: string;
}

export class CreateExamResultDetailDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  generalExamName: string;

  @IsOptional()
  @IsDateString()
  resultIssueDate?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamResultParameterDto)
  parameters: CreateExamResultParameterDto[];
}

export class CreateAttachmentDetailDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  originalFileName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  mimeType?: string;

  @IsNotEmpty()
  @IsString() // La ruta o el identificador del archivo guardado
  storagePath: string; // Esto requerirá lógica de subida de archivos separada
}

// --- DTO Principal ---
export class CreateClinicalRecordEntryDto {
  // ... (campos existentes: attentionHealthEntityId, eventTypeId, etc.) ...
  @IsNotEmpty() @IsInt() attentionHealthEntityId: number;
  @IsOptional() @IsInt() attentionSpaceId?: number;
  @IsOptional() @IsInt() associatedAppointmentId?: number;
  @IsNotEmpty() @IsInt() eventTypeId: number;
  @IsNotEmpty() @IsDateString() attentionStartDateTime: string;
  @IsOptional() @IsString() @MaxLength(5000) narrativeSummary?: string;

  // Nuevos campos para los detalles
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Valida cada objeto en el array
  @Type(() => CreateDiagnosisDetailDto) // Ayuda a class-transformer a instanciar la clase correcta
  diagnoses?: CreateDiagnosisDetailDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionDetailDto)
  prescriptions?: CreatePrescriptionDetailDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamResultDetailDto)
  examResults?: CreateExamResultDetailDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentDetailDto)
  attachments?: CreateAttachmentDetailDto[];
}
