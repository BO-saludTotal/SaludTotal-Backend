import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalEventType } from '../entity/medicalEventType'; 
import { MedicalEventTypeController } from './medical-event-type.controller';
import { MedicalEventTypeService } from './medical-event-type.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalEventType]), AuthModule],
  controllers: [MedicalEventTypeController],
  providers: [MedicalEventTypeService],
})
export class MedicalEventTypeModule {}