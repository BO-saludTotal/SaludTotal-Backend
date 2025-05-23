import { Module } from '@nestjs/common';
import { AdministrativeStaffDetailService } from './administrative-staff-detail.service';
import { AdministrativeStaffDetailController } from './administrative-staff-detail.controller';

@Module({
  controllers: [AdministrativeStaffDetailController],
  providers: [AdministrativeStaffDetailService],
})
export class AdministrativeStaffDetailModule {}
