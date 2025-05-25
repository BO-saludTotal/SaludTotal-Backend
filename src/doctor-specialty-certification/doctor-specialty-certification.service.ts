import { Injectable } from '@nestjs/common';
import { CreateDoctorSpecialtyCertificationDto } from './dto/create-doctor-specialty-certification.dto';
import { UpdateDoctorSpecialtyCertificationDto } from './dto/update-doctor-specialty-certification.dto';

@Injectable()
export class DoctorSpecialtyCertificationService {
  create(createDoctorSpecialtyCertificationDto: CreateDoctorSpecialtyCertificationDto) {
    return 'This action adds a new doctorSpecialtyCertification';
  }

  findAll() {
    return `This action returns all doctorSpecialtyCertification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorSpecialtyCertification`;
  }

  update(id: number, updateDoctorSpecialtyCertificationDto: UpdateDoctorSpecialtyCertificationDto) {
    return `This action updates a #${id} doctorSpecialtyCertification`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorSpecialtyCertification`;
  }
}
