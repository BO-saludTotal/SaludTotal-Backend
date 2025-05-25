import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { MedicalAppointmentService } from './medical-appointment.service';

describe('MedicalAppointmentController', () => {
  let controller: MedicalAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalAppointmentController],
      providers: [MedicalAppointmentService],
    }).compile();

    controller = module.get<MedicalAppointmentController>(MedicalAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
