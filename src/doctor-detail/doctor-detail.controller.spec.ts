import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDetailController } from './doctor-detail.controller';
import { DoctorDetailService } from './doctor-detail.service';

describe('DoctorDetailController', () => {
  let controller: DoctorDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorDetailController],
      providers: [DoctorDetailService],
    }).compile();

    controller = module.get<DoctorDetailController>(DoctorDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
