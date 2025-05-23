import { Test, TestingModule } from '@nestjs/testing';
import { SentNotificationLogController } from './sent-notification-log.controller';
import { SentNotificationLogService } from './sent-notification-log.service';

describe('SentNotificationLogController', () => {
  let controller: SentNotificationLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentNotificationLogController],
      providers: [SentNotificationLogService],
    }).compile();

    controller = module.get<SentNotificationLogController>(SentNotificationLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
