import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilitySlotService } from './availability-slot.service';
import { AvailabilitySlotController } from './availability-slot.controller';
import { AvailabilitySlot } from '../entity/availabilitySlot'; 
import { AuthModule } from '../auth/auth.module'; 

import { User } from '../entity/user';
import { DoctorDetail } from '../entity/doctorDetail';
import { DoctorSpecialtyCertification } from '../entity/doctorSpecialtyCertification';

@Module({
  imports: [
    AuthModule, 
    TypeOrmModule.forFeature([
      AvailabilitySlot,
      User,  
      DoctorDetail, 
      DoctorSpecialtyCertification 
    ]),
  ],
  controllers: [AvailabilitySlotController],
  providers: [AvailabilitySlotService],
  exports: [AvailabilitySlotService] 
})
export class AvailabilitySlotModule {}