import { Injectable } from '@nestjs/common';
import { CreateHealthEntitySpecialtyDto } from './dto/create-health-entity-specialty.dto';
import { UpdateHealthEntitySpecialtyDto } from './dto/update-health-entity-specialty.dto';

@Injectable()
export class HealthEntitySpecialtyService {
  create(createHealthEntitySpecialtyDto: CreateHealthEntitySpecialtyDto) {
    return 'This action adds a new healthEntitySpecialty';
  }

  findAll() {
    return `This action returns all healthEntitySpecialty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthEntitySpecialty`;
  }

  update(id: number, updateHealthEntitySpecialtyDto: UpdateHealthEntitySpecialtyDto) {
    return `This action updates a #${id} healthEntitySpecialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthEntitySpecialty`;
  }
}
