import { Module } from '@nestjs/common';
import { GovernmentStaffDetailService } from './government-staff-detail.service';
import { GovernmentStaffDetailController } from './government-staff-detail.controller';

@Module({
  controllers: [GovernmentStaffDetailController],
  providers: [GovernmentStaffDetailService],
})
export class GovernmentStaffDetailModule {}
