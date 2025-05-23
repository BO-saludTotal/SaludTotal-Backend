import { Injectable } from '@nestjs/common';
import { CreateClinicalRecordDiagnosisDto } from './dto/create-clinical-record-diagnosis.dto';
import { UpdateClinicalRecordDiagnosisDto } from './dto/update-clinical-record-diagnosis.dto';

@Injectable()
export class ClinicalRecordDiagnosisService {
  create(createClinicalRecordDiagnosisDto: CreateClinicalRecordDiagnosisDto) {
    return 'This action adds a new clinicalRecordDiagnosis';
  }

  findAll() {
    return `This action returns all clinicalRecordDiagnosis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalRecordDiagnosis`;
  }

  update(id: number, updateClinicalRecordDiagnosisDto: UpdateClinicalRecordDiagnosisDto) {
    return `This action updates a #${id} clinicalRecordDiagnosis`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalRecordDiagnosis`;
  }
}
