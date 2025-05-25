import { Test, TestingModule } from '@nestjs/testing';
import { MedicalGeneralCatalogService } from './medical-general-catalog.service';

describe('MedicalGeneralCatalogService', () => {
  let service: MedicalGeneralCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalGeneralCatalogService],
    }).compile();

    service = module.get<MedicalGeneralCatalogService>(MedicalGeneralCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
