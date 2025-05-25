import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisCodeService } from './diagnosis-code.service';

describe('DiagnosisCodeService', () => {
  let service: DiagnosisCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosisCodeService],
    }).compile();

    service = module.get<DiagnosisCodeService>(DiagnosisCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
