import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisCodeController } from './diagnosis-code.controller';
import { DiagnosisCodeService } from './diagnosis-code.service';

describe('DiagnosisCodeController', () => {
  let controller: DiagnosisCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosisCodeController],
      providers: [DiagnosisCodeService],
    }).compile();

    controller = module.get<DiagnosisCodeController>(DiagnosisCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
