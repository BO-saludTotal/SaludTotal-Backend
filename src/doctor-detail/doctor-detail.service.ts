import { Injectable } from '@nestjs/common';
import { CreateDoctorDetailDto } from './dto/create-doctor-detail.dto';
import { UpdateDoctorDetailDto } from './dto/update-doctor-detail.dto';

@Injectable()
export class DoctorDetailService {
  create(createDoctorDetailDto: CreateDoctorDetailDto) {
    return 'This action adds a new doctorDetail';
  }

  findAll() {
    return `This action returns all doctorDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorDetail`;
  }

  update(id: number, updateDoctorDetailDto: UpdateDoctorDetailDto) {
    return `This action updates a #${id} doctorDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorDetail`;
  }
}
