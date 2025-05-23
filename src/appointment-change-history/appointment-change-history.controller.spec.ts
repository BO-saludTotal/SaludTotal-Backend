import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentChangeHistoryController } from './appointment-change-history.controller';
import { AppointmentChangeHistoryService } from './appointment-change-history.service';

describe('AppointmentChangeHistoryController', () => {
  let controller: AppointmentChangeHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentChangeHistoryController],
      providers: [AppointmentChangeHistoryService],
    }).compile();

    controller = module.get<AppointmentChangeHistoryController>(AppointmentChangeHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
