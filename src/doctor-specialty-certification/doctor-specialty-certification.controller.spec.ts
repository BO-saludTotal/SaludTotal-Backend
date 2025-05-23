import { Test, TestingModule } from '@nestjs/testing';
import { DoctorSpecialtyCertificationController } from './doctor-specialty-certification.controller';
import { DoctorSpecialtyCertificationService } from './doctor-specialty-certification.service';

describe('DoctorSpecialtyCertificationController', () => {
  let controller: DoctorSpecialtyCertificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorSpecialtyCertificationController],
      providers: [DoctorSpecialtyCertificationService],
    }).compile();

    controller = module.get<DoctorSpecialtyCertificationController>(DoctorSpecialtyCertificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
