import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleBlockExceptionController } from './schedule-block-exception.controller';
import { ScheduleBlockExceptionService } from './schedule-block-exception.service';

describe('ScheduleBlockExceptionController', () => {
  let controller: ScheduleBlockExceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleBlockExceptionController],
      providers: [ScheduleBlockExceptionService],
    }).compile();

    controller = module.get<ScheduleBlockExceptionController>(ScheduleBlockExceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
