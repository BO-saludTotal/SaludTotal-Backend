import { Injectable } from '@nestjs/common';
import { CreateAdministrativeStaffDetailDto } from './dto/create-administrative-staff-detail.dto';
import { UpdateAdministrativeStaffDetailDto } from './dto/update-administrative-staff-detail.dto';

@Injectable()
export class AdministrativeStaffDetailService {
  create(createAdministrativeStaffDetailDto: CreateAdministrativeStaffDetailDto) {
    return 'This action adds a new administrativeStaffDetail';
  }

  findAll() {
    return `This action returns all administrativeStaffDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrativeStaffDetail`;
  }

  update(id: number, updateAdministrativeStaffDetailDto: UpdateAdministrativeStaffDetailDto) {
    return `This action updates a #${id} administrativeStaffDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrativeStaffDetail`;
  }
}
