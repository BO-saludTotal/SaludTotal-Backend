
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateClinicalRecordAttachmentDto {
  @IsNotEmpty({ message: 'La ruta de almacenamiento del archivo es requerida.'})
  @IsString()
  storagePath: string; // URL o ruta en el sistema de archivos donde se guardó el archivo TEO

  @IsOptional()
  @IsString()
  @MaxLength(255)
  originalFileName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  mimeType?: string; // 'image/jpeg', 'application/pdf' TEO revisa esto


}
