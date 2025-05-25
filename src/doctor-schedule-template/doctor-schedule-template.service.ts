import { Injectable } from '@nestjs/common';
import { CreateDoctorScheduleTemplateDto } from './dto/create-doctor-schedule-template.dto';
import { UpdateDoctorScheduleTemplateDto } from './dto/update-doctor-schedule-template.dto';

@Injectable()
export class DoctorScheduleTemplateService {
  create(createDoctorScheduleTemplateDto: CreateDoctorScheduleTemplateDto) {
    return 'This action adds a new doctorScheduleTemplate';
  }

  findAll() {
    return `This action returns all doctorScheduleTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorScheduleTemplate`;
  }

  update(id: number, updateDoctorScheduleTemplateDto: UpdateDoctorScheduleTemplateDto) {
    return `This action updates a #${id} doctorScheduleTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorScheduleTemplate`;
  }
}
