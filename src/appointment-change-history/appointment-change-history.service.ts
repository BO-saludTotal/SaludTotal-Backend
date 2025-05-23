import { Injectable } from '@nestjs/common';
import { CreateAppointmentChangeHistoryDto } from './dto/create-appointment-change-history.dto';
import { UpdateAppointmentChangeHistoryDto } from './dto/update-appointment-change-history.dto';

@Injectable()
export class AppointmentChangeHistoryService {
  create(createAppointmentChangeHistoryDto: CreateAppointmentChangeHistoryDto) {
    return 'This action adds a new appointmentChangeHistory';
  }

  findAll() {
    return `This action returns all appointmentChangeHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentChangeHistory`;
  }

  update(id: number, updateAppointmentChangeHistoryDto: UpdateAppointmentChangeHistoryDto) {
    return `This action updates a #${id} appointmentChangeHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentChangeHistory`;
  }
}
