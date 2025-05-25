import { Test, TestingModule } from '@nestjs/testing';
import { HealthEntityController } from './health-entity.controller';
import { HealthEntityService } from './health-entity.service';

describe('HealthEntityController', () => {
  let controller: HealthEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthEntityController],
      providers: [HealthEntityService],
    }).compile();

    controller = module.get<HealthEntityController>(HealthEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
