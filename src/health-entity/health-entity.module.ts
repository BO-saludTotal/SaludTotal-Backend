import { Module } from '@nestjs/common';
import { HealthEntityService } from './health-entity.service';
import { HealthEntityController } from './health-entity.controller';

@Module({
  controllers: [HealthEntityController],
  providers: [HealthEntityService],
})
export class HealthEntityModule {}
