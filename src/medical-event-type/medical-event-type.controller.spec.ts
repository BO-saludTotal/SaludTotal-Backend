import { Test, TestingModule } from '@nestjs/testing';
import { MedicalEventTypeController } from './medical-event-type.controller';
import { MedicalEventTypeService } from './medical-event-type.service';

describe('MedicalEventTypeController', () => {
  let controller: MedicalEventTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalEventTypeController],
      providers: [MedicalEventTypeService],
    }).compile();

    controller = module.get<MedicalEventTypeController>(MedicalEventTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
