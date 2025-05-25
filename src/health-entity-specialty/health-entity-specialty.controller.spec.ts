import { Test, TestingModule } from '@nestjs/testing';
import { HealthEntitySpecialtyController } from './health-entity-specialty.controller';
import { HealthEntitySpecialtyService } from './health-entity-specialty.service';

describe('HealthEntitySpecialtyController', () => {
  let controller: HealthEntitySpecialtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthEntitySpecialtyController],
      providers: [HealthEntitySpecialtyService],
    }).compile();

    controller = module.get<HealthEntitySpecialtyController>(HealthEntitySpecialtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
