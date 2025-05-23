import { Test, TestingModule } from '@nestjs/testing';
import { ReportTypeService } from './report-type.service';

describe('ReportTypeService', () => {
  let service: ReportTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportTypeService],
    }).compile();

    service = module.get<ReportTypeService>(ReportTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
