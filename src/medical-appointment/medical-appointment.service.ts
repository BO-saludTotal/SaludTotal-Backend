import { Injectable } from '@nestjs/common';
import { UpdateMedicalAppointmentDto } from './dto/update-medical-appointment.dto';
import { MedicalAppointment } from 'src/entity/medicalAppointment';
import { MedicalAppointmentRepository } from './medical-appointment.repository';

@Injectable()
export class MedicalAppointmentService {
  constructor(private MedicalAppointmentRepo:MedicalAppointmentRepository){}

async create(createMedicalAppointmentDto: MedicalAppointment): Promise<MedicalAppointment> {
  const savedAppointment = await this.MedicalAppointmentRepo.createMedicalAppointment(createMedicalAppointmentDto);
  return savedAppointment; // Devuelve la entidad guardada
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
