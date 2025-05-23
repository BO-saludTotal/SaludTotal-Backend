import { Test, TestingModule } from '@nestjs/testing';
import { SentNotificationLogService } from './sent-notification-log.service';

describe('SentNotificationLogService', () => {
  let service: SentNotificationLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentNotificationLogService],
    }).compile();

    service = module.get<SentNotificationLogService>(SentNotificationLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
