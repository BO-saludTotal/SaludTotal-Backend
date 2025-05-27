import { Test, TestingModule } from '@nestjs/testing';
import { GeneratedReportHistoryController } from './generated-report-history.controller';
import { GeneratedReportHistoryService } from './generated-report-history.service';

describe('GeneratedReportHistoryController', () => {
  let controller: GeneratedReportHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneratedReportHistoryController],
      providers: [GeneratedReportHistoryService],
    }).compile();

    controller = module.get<GeneratedReportHistoryController>(
      GeneratedReportHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
