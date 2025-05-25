import { Test, TestingModule } from '@nestjs/testing';
import { ReportTypeController } from './report-type.controller';
import { ReportTypeService } from './report-type.service';

describe('ReportTypeController', () => {
  let controller: ReportTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportTypeController],
      providers: [ReportTypeService],
    }).compile();

    controller = module.get<ReportTypeController>(ReportTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
