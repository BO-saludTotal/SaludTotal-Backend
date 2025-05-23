import { Injectable } from '@nestjs/common';
import { CreateMedicalEventTypeDto } from './dto/create-medical-event-type.dto';
import { UpdateMedicalEventTypeDto } from './dto/update-medical-event-type.dto';

@Injectable()
export class MedicalEventTypeService {
  create(createMedicalEventTypeDto: CreateMedicalEventTypeDto) {
    return 'This action adds a new medicalEventType';
  }

  findAll() {
    return `This action returns all medicalEventType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalEventType`;
  }

  update(id: number, updateMedicalEventTypeDto: UpdateMedicalEventTypeDto) {
    return `This action updates a #${id} medicalEventType`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalEventType`;
  }
}
