import { Injectable } from '@nestjs/common';
import { CreateDoctorHealthEntityAffiliationDto } from './dto/create-doctor-health-entity-affiliation.dto';
import { UpdateDoctorHealthEntityAffiliationDto } from './dto/update-doctor-health-entity-affiliation.dto';

@Injectable()
export class DoctorHealthEntityAffiliationService {
  create(createDoctorHealthEntityAffiliationDto: CreateDoctorHealthEntityAffiliationDto) {
    return 'This action adds a new doctorHealthEntityAffiliation';
  }

  findAll() {
    return `This action returns all doctorHealthEntityAffiliation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorHealthEntityAffiliation`;
  }

  update(id: number, updateDoctorHealthEntityAffiliationDto: UpdateDoctorHealthEntityAffiliationDto) {
    return `This action updates a #${id} doctorHealthEntityAffiliation`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorHealthEntityAffiliation`;
  }
}
