import { Module } from '@nestjs/common';
import { AppointmentChangeHistoryService } from './appointment-change-history.service';
import { AppointmentChangeHistoryController } from './appointment-change-history.controller';

@Module({
  controllers: [AppointmentChangeHistoryController],
  providers: [AppointmentChangeHistoryService],
})
export class AppointmentChangeHistoryModule {}
