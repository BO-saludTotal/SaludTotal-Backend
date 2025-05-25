import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SentNotificationLogService } from './sent-notification-log.service';
import { CreateSentNotificationLogDto } from './dto/create-sent-notification-log.dto';
import { UpdateSentNotificationLogDto } from './dto/update-sent-notification-log.dto';

@Controller('sent-notification-log')
export class SentNotificationLogController {
  constructor(private readonly sentNotificationLogService: SentNotificationLogService) {}

  @Post()
  create(@Body() createSentNotificationLogDto: CreateSentNotificationLogDto) {
    return this.sentNotificationLogService.create(createSentNotificationLogDto);
  }

  @Get()
  findAll() {
    return this.sentNotificationLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentNotificationLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSentNotificationLogDto: UpdateSentNotificationLogDto) {
    return this.sentNotificationLogService.update(+id, updateSentNotificationLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sentNotificationLogService.remove(+id);
  }
}
