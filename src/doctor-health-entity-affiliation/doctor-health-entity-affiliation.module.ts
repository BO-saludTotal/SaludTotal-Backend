import { Module } from '@nestjs/common';
import { DoctorHealthEntityAffiliationService } from './doctor-health-entity-affiliation.service';
import { DoctorHealthEntityAffiliationController } from './doctor-health-entity-affiliation.controller';

@Module({
  controllers: [DoctorHealthEntityAffiliationController],
  providers: [DoctorHealthEntityAffiliationService],
})
export class DoctorHealthEntityAffiliationModule {}
