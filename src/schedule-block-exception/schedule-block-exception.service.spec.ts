import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleBlockExceptionService } from './schedule-block-exception.service';

describe('ScheduleBlockExceptionService', () => {
  let service: ScheduleBlockExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleBlockExceptionService],
    }).compile();

    service = module.get<ScheduleBlockExceptionService>(ScheduleBlockExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
