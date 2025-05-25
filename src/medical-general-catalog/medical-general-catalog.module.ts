import { Module } from '@nestjs/common';
import { MedicalGeneralCatalogService } from './medical-general-catalog.service';
import { MedicalGeneralCatalogController } from './medical-general-catalog.controller';

@Module({
  controllers: [MedicalGeneralCatalogController],
  providers: [MedicalGeneralCatalogService],
})
export class MedicalGeneralCatalogModule {}
