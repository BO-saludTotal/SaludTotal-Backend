import { Test, TestingModule } from '@nestjs/testing';
import { GeneratedReportHistoryService } from './generated-report-history.service';

describe('GeneratedReportHistoryService', () => {
  let service: GeneratedReportHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratedReportHistoryService],
    }).compile();

    service = module.get<GeneratedReportHistoryService>(
      GeneratedReportHistoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
