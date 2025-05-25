import { Test, TestingModule } from '@nestjs/testing';
import { DoctorScheduleTemplateController } from './doctor-schedule-template.controller';
import { DoctorScheduleTemplateService } from './doctor-schedule-template.service';

describe('DoctorScheduleTemplateController', () => {
  let controller: DoctorScheduleTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorScheduleTemplateController],
      providers: [DoctorScheduleTemplateService],
    }).compile();

    controller = module.get<DoctorScheduleTemplateController>(DoctorScheduleTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
