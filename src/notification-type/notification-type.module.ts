import { Module } from '@nestjs/common';
import { NotificationTypeService } from './notification-type.service';
import { NotificationTypeController } from './notification-type.controller';

@Module({
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService],
})
export class NotificationTypeModule {}
