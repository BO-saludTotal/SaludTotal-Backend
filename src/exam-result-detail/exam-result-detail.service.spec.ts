import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultDetailService } from './exam-result-detail.service';

describe('ExamResultDetailService', () => {
  let service: ExamResultDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamResultDetailService],
    }).compile();

    service = module.get<ExamResultDetailService>(ExamResultDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
