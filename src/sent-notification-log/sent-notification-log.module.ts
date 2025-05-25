import { Module } from '@nestjs/common';
import { SentNotificationLogService } from './sent-notification-log.service';
import { SentNotificationLogController } from './sent-notification-log.controller';

@Module({
  controllers: [SentNotificationLogController],
  providers: [SentNotificationLogService],
})
export class SentNotificationLogModule {}
