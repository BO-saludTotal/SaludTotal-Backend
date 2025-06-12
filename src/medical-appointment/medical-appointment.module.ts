import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAppointmentService } from './medical-appointment.service';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { MedicalAppointment } from '../entity/medicalAppointment';
import { AvailabilitySlot } from '../entity/availabilitySlot';
import { User } from '../entity/user';
import { AppointmentChangeHistory } from '../entity/appointmentChangeHistory';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MedicalAppointment,
      AvailabilitySlot,
      User,
      AppointmentChangeHistory,
    ]),
  ],
  controllers: [MedicalAppointmentController],
  providers: [MedicalAppointmentService],
  exports: [MedicalAppointmentService] 
})
export class MedicalAppointmentModule {}