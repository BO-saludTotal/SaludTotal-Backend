import { Module } from '@nestjs/common';
import { ScheduleBlockExceptionService } from './schedule-block-exception.service';
import { ScheduleBlockExceptionController } from './schedule-block-exception.controller';

@Module({
  controllers: [ScheduleBlockExceptionController],
  providers: [ScheduleBlockExceptionService],
})
export class ScheduleBlockExceptionModule {}
