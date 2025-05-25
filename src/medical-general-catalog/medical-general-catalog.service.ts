import { Injectable } from '@nestjs/common';
import { CreateMedicalGeneralCatalogDto } from './dto/create-medical-general-catalog.dto';
import { UpdateMedicalGeneralCatalogDto } from './dto/update-medical-general-catalog.dto';

@Injectable()
export class MedicalGeneralCatalogService {
  create(createMedicalGeneralCatalogDto: CreateMedicalGeneralCatalogDto) {
    return 'This action adds a new medicalGeneralCatalog';
  }

  findAll() {
    return `This action returns all medicalGeneralCatalog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalGeneralCatalog`;
  }

  update(id: number, updateMedicalGeneralCatalogDto: UpdateMedicalGeneralCatalogDto) {
    return `This action updates a #${id} medicalGeneralCatalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalGeneralCatalog`;
  }
}
