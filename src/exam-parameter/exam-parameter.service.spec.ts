import { Test, TestingModule } from '@nestjs/testing';
import { ExamParameterService } from './exam-parameter.service';

describe('ExamParameterService', () => {
  let service: ExamParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamParameterService],
    }).compile();

    service = module.get<ExamParameterService>(ExamParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
