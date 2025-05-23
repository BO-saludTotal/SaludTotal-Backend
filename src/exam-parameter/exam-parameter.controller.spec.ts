import { Test, TestingModule } from '@nestjs/testing';
import { ExamParameterController } from './exam-parameter.controller';
import { ExamParameterService } from './exam-parameter.service';

describe('ExamParameterController', () => {
  let controller: ExamParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamParameterController],
      providers: [ExamParameterService],
    }).compile();

    controller = module.get<ExamParameterController>(ExamParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
