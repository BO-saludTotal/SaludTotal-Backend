import { Test, TestingModule } from '@nestjs/testing';
import { DoctorHealthEntityAffiliationController } from './doctor-health-entity-affiliation.controller';
import { DoctorHealthEntityAffiliationService } from './doctor-health-entity-affiliation.service';

describe('DoctorHealthEntityAffiliationController', () => {
  let controller: DoctorHealthEntityAffiliationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorHealthEntityAffiliationController],
      providers: [DoctorHealthEntityAffiliationService],
    }).compile();

    controller = module.get<DoctorHealthEntityAffiliationController>(DoctorHealthEntityAffiliationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
