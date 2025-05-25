import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentChangeHistoryService } from './appointment-change-history.service';

describe('AppointmentChangeHistoryService', () => {
  let service: AppointmentChangeHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentChangeHistoryService],
    }).compile();

    service = module.get<AppointmentChangeHistoryService>(AppointmentChangeHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
