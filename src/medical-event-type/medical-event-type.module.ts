import { Module } from '@nestjs/common';
import { MedicalEventTypeService } from './medical-event-type.service';
import { MedicalEventTypeController } from './medical-event-type.controller';

@Module({
  controllers: [MedicalEventTypeController],
  providers: [MedicalEventTypeService],
})
export class MedicalEventTypeModule {}
