import { Test, TestingModule } from '@nestjs/testing';
import { MedicalEventTypeService } from './medical-event-type.service';

describe('MedicalEventTypeService', () => {
  let service: MedicalEventTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalEventTypeService],
    }).compile();

    service = module.get<MedicalEventTypeService>(MedicalEventTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
