import { Module } from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { MedicalAppointment } from 'src/entity/medicalAppointment';
import { MedicalAppointmentRepository } from './medical-appointment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalAppointment])],
  controllers: [MedicalAppointmentController],
  providers: [MedicalAppointmentService, MedicalAppointmentRepository],
})
export class MedicalAppointmentModule {}
