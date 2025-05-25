import { Injectable } from '@nestjs/common';
import { CreateHealthEntityDto } from './dto/create-health-entity.dto';
import { UpdateHealthEntityDto } from './dto/update-health-entity.dto';

@Injectable()
export class HealthEntityService {
  create(createHealthEntityDto: CreateHealthEntityDto) {
    return 'This action adds a new healthEntity';
  }

  findAll() {
    return `This action returns all healthEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthEntity`;
  }

  update(id: number, updateHealthEntityDto: UpdateHealthEntityDto) {
    return `This action updates a #${id} healthEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthEntity`;
  }
}
