import { Injectable } from '@nestjs/common';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { UpdateMedicalAppointmentDto } from './dto/update-medical-appointment.dto';
import { MedicalAppointment } from 'src/entity/medicalAppointment';
import { MedicalAppointmentRepository } from './medical-appointment.repository';

@Injectable()
export class MedicalAppointmentService {
  constructor(private MedicalAppointmentRepo:MedicalAppointmentRepository){}
  create(createMedicalAppointmentDto: MedicalAppointment) {
    this.MedicalAppointmentRepo.createMedicalAppointment(createMedicalAppointmentDto);
  }

  findAll() {
    return this.MedicalAppointmentRepo.getAllMedicAppointment();
  }

  findOne(id: number) {
    return this.MedicalAppointmentRepo.getMedicAppointmentByID(id);
  }

  update(id: number, updateMedicalAppointmentDto: UpdateMedicalAppointmentDto) {
    return `This action updates a #${id} medicalAppointment`;
  }

  remove(id: number) {
    return this.MedicalAppointmentRepo.delete(id);
  }
}
