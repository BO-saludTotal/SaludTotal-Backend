import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeStaffDetailController } from './administrative-staff-detail.controller';
import { AdministrativeStaffDetailService } from './administrative-staff-detail.service';

describe('AdministrativeStaffDetailController', () => {
  let controller: AdministrativeStaffDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativeStaffDetailController],
      providers: [AdministrativeStaffDetailService],
    }).compile();

    controller = module.get<AdministrativeStaffDetailController>(AdministrativeStaffDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
