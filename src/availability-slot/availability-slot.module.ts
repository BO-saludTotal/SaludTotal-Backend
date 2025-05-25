import { Module } from '@nestjs/common';
import { AvailabilitySlotService } from './availability-slot.service';
import { AvailabilitySlotController } from './availability-slot.controller';

@Module({
  controllers: [AvailabilitySlotController],
  providers: [AvailabilitySlotService],
})
export class AvailabilitySlotModule {}
