import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAppointmentService } from './medical-appointment.service';

describe('MedicalAppointmentService', () => {
  let service: MedicalAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalAppointmentService],
    }).compile();

    service = module.get<MedicalAppointmentService>(MedicalAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
