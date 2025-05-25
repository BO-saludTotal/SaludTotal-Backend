import { Injectable } from '@nestjs/common';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';

@Injectable()
export class NotificationTypeService {
  create(createNotificationTypeDto: CreateNotificationTypeDto) {
    return 'This action adds a new notificationType';
  }

  findAll() {
    return `This action returns all notificationType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationType`;
  }

  update(id: number, updateNotificationTypeDto: UpdateNotificationTypeDto) {
    return `This action updates a #${id} notificationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationType`;
  }
}
