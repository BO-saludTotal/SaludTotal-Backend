import { Test, TestingModule } from '@nestjs/testing';
import { GovernmentStaffDetailController } from './government-staff-detail.controller';
import { GovernmentStaffDetailService } from './government-staff-detail.service';

describe('GovernmentStaffDetailController', () => {
  let controller: GovernmentStaffDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GovernmentStaffDetailController],
      providers: [GovernmentStaffDetailService],
    }).compile();

    controller = module.get<GovernmentStaffDetailController>(GovernmentStaffDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
