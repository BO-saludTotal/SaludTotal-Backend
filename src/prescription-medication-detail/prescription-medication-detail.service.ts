import { Injectable } from '@nestjs/common';
import { CreatePrescriptionMedicationDetailDto } from './dto/create-prescription-medication-detail.dto';
import { UpdatePrescriptionMedicationDetailDto } from './dto/update-prescription-medication-detail.dto';

@Injectable()
export class PrescriptionMedicationDetailService {
  create(createPrescriptionMedicationDetailDto: CreatePrescriptionMedicationDetailDto) {
    return 'This action adds a new prescriptionMedicationDetail';
  }

  findAll() {
    return `This action returns all prescriptionMedicationDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescriptionMedicationDetail`;
  }

  update(id: number, updatePrescriptionMedicationDetailDto: UpdatePrescriptionMedicationDetailDto) {
    return `This action updates a #${id} prescriptionMedicationDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescriptionMedicationDetail`;
  }
}
