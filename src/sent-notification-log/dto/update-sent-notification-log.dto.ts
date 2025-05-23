import { PartialType } from '@nestjs/mapped-types';
import { CreateSentNotificationLogDto } from './create-sent-notification-log.dto';

export class UpdateSentNotificationLogDto extends PartialType(CreateSentNotificationLogDto) {}
