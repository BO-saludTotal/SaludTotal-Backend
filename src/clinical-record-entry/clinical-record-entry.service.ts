/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateClinicalRecordEntryDto } from './dto/create-clinical-record-entry.dto';
import { UpdateClinicalRecordEntryDto } from './dto/update-clinical-record-entry.dto';

@Injectable()
export class ClinicalRecordEntryService {
  create(createClinicalRecordEntryDto: CreateClinicalRecordEntryDto) {
    return 'This action adds a new clinicalRecordEntry';
  }

  findAll() {
    return `This action returns all clinicalRecordEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalRecordEntry`;
  }

  update(
    id: number,
    updateClinicalRecordEntryDto: UpdateClinicalRecordEntryDto,
  ) {
    return `This action updates a #${id} clinicalRecordEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalRecordEntry`;
  }
}
