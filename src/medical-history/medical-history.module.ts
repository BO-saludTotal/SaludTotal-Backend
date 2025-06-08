import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalAppointment } from '../entity/medicalAppointment';
import { PhysicalAttentionSpace } from 'src/entity/physicalAttentionSpace';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { User } from '../entity/user';
import { MedicalEventType } from '../entity/medicalEventType';
import { HealthEntity } from '../entity/healthEntity';
import {
  IsNotEmpty,
  //IsDateString,
  IsOptional,
  IsInt,
  //MaxLength,
  //IsUUID,
} from 'class-validator';

export class CreateClinicalRecordEntryDto {
  @IsNotEmpty({
    message: 'El ID de la entidad de salud de atención es requerido.',
  })
  @IsInt({ message: 'El ID de la entidad de salud debe ser un número entero.' })
  attentionHealthEntityId: number;

  @IsOptional()
  @IsInt({
    message: 'El ID del espacio de atención debe ser un número entero.',
  })
  attentionSpaceId?: number;

  @IsOptional()
  @IsInt({ message: 'El ID de la cita asociada debe ser un número entero.' })
  associatedAppointmentId?: number;

  @IsNotEmpty({ message: 'El ID del tipo de evento médico es requerido.' })
  @IsInt({
    message: 'El ID del tipo de evento médico debe ser un número entero.',
  })
  eventTypeId: number;
}

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ClinicalRecordEntry,
      User,
      MedicalEventType,
      HealthEntity,
      PhysicalAttentionSpace,
      MedicalAppointment,
    ]),
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
