import { Module } from '@nestjs/common';
import { HealthEntitySpecialtyService } from './health-entity-specialty.service';
import { HealthEntitySpecialtyController } from './health-entity-specialty.controller';

@Module({
  controllers: [HealthEntitySpecialtyController],
  providers: [HealthEntitySpecialtyService],
})
export class HealthEntitySpecialtyModule {}
