import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultDetailController } from './exam-result-detail.controller';
import { ExamResultDetailService } from './exam-result-detail.service';

describe('ExamResultDetailController', () => {
  let controller: ExamResultDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamResultDetailController],
      providers: [ExamResultDetailService],
    }).compile();

    controller = module.get<ExamResultDetailController>(ExamResultDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
