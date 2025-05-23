import { Test, TestingModule } from '@nestjs/testing';
import { MedicalGeneralCatalogController } from './medical-general-catalog.controller';
import { MedicalGeneralCatalogService } from './medical-general-catalog.service';

describe('MedicalGeneralCatalogController', () => {
  let controller: MedicalGeneralCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalGeneralCatalogController],
      providers: [MedicalGeneralCatalogService],
    }).compile();

    controller = module.get<MedicalGeneralCatalogController>(MedicalGeneralCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
