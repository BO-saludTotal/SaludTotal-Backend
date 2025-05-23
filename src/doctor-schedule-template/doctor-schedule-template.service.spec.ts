import { Test, TestingModule } from '@nestjs/testing';
import { DoctorScheduleTemplateService } from './doctor-schedule-template.service';

describe('DoctorScheduleTemplateService', () => {
  let service: DoctorScheduleTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorScheduleTemplateService],
    }).compile();

    service = module.get<DoctorScheduleTemplateService>(DoctorScheduleTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
