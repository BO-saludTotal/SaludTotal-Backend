import {
  NotificationChannel,
  NotificationStatus,
} from 'src/entity/sentNotificationLog';
export interface sentNotificationLogModel {
  id: number;
  recipientUserId?: string | null;
  notificationTypeId?: number | null;
  channelUsed?: NotificationChannel | null;
  destinationAddress?: string | null;
  effectiveSentDateTime?: Date | null;
  sendStatus?: NotificationStatus | null;
  sentMessageContent?: string | null;
}
