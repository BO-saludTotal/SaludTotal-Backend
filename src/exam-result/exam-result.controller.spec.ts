import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultController } from './exam-result.controller';
import { ExamResultService } from './exam-result.service';

describe('ExamResultController', () => {
  let controller: ExamResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamResultController],
      providers: [ExamResultService],
    }).compile();

    controller = module.get<ExamResultController>(ExamResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
