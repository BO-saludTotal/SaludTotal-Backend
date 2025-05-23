import { Injectable } from '@nestjs/common';
import { CreateMedicalSpecialtyDto } from './dto/create-medical-specialty.dto';
import { UpdateMedicalSpecialtyDto } from './dto/update-medical-specialty.dto';

@Injectable()
export class MedicalSpecialtyService {
  create(createMedicalSpecialtyDto: CreateMedicalSpecialtyDto) {
    return 'This action adds a new medicalSpecialty';
  }

  findAll() {
    return `This action returns all medicalSpecialty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalSpecialty`;
  }

  update(id: number, updateMedicalSpecialtyDto: UpdateMedicalSpecialtyDto) {
    return `This action updates a #${id} medicalSpecialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalSpecialty`;
  }
}
