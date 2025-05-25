import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilitySlotController } from './availability-slot.controller';
import { AvailabilitySlotService } from './availability-slot.service';

describe('AvailabilitySlotController', () => {
  let controller: AvailabilitySlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilitySlotController],
      providers: [AvailabilitySlotService],
    }).compile();

    controller = module.get<AvailabilitySlotController>(AvailabilitySlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
