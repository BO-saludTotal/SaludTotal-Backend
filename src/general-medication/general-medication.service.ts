import { Injectable } from '@nestjs/common';
import { CreateGeneralMedicationDto } from './dto/create-general-medication.dto';
import { UpdateGeneralMedicationDto } from './dto/update-general-medication.dto';

@Injectable()
export class GeneralMedicationService {
  create(createGeneralMedicationDto: CreateGeneralMedicationDto) {
    return 'This action adds a new generalMedication';
  }

  findAll() {
    return `This action returns all generalMedication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalMedication`;
  }

  update(id: number, updateGeneralMedicationDto: UpdateGeneralMedicationDto) {
    return `This action updates a #${id} generalMedication`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalMedication`;
  }
}
