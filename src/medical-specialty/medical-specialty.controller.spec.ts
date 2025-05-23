import { Test, TestingModule } from '@nestjs/testing';
import { MedicalSpecialtyController } from './medical-specialty.controller';
import { MedicalSpecialtyService } from './medical-specialty.service';

describe('MedicalSpecialtyController', () => {
  let controller: MedicalSpecialtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalSpecialtyController],
      providers: [MedicalSpecialtyService],
    }).compile();

    controller = module.get<MedicalSpecialtyController>(MedicalSpecialtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
