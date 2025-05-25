import { Injectable } from '@nestjs/common';
import { CreateGovernmentStaffDetailDto } from './dto/create-government-staff-detail.dto';
import { UpdateGovernmentStaffDetailDto } from './dto/update-government-staff-detail.dto';

@Injectable()
export class GovernmentStaffDetailService {
  create(createGovernmentStaffDetailDto: CreateGovernmentStaffDetailDto) {
    return 'This action adds a new governmentStaffDetail';
  }

  findAll() {
    return `This action returns all governmentStaffDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} governmentStaffDetail`;
  }

  update(id: number, updateGovernmentStaffDetailDto: UpdateGovernmentStaffDetailDto) {
    return `This action updates a #${id} governmentStaffDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} governmentStaffDetail`;
  }
}
