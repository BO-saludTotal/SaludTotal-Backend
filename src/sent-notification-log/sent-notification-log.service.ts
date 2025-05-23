import { Injectable } from '@nestjs/common';
import { CreateSentNotificationLogDto } from './dto/create-sent-notification-log.dto';
import { UpdateSentNotificationLogDto } from './dto/update-sent-notification-log.dto';

@Injectable()
export class SentNotificationLogService {
  create(createSentNotificationLogDto: CreateSentNotificationLogDto) {
    return 'This action adds a new sentNotificationLog';
  }

  findAll() {
    return `This action returns all sentNotificationLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sentNotificationLog`;
  }

  update(id: number, updateSentNotificationLogDto: UpdateSentNotificationLogDto) {
    return `This action updates a #${id} sentNotificationLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} sentNotificationLog`;
  }
}
