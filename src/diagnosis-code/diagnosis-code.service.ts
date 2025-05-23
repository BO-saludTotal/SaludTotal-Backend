import { Injectable } from '@nestjs/common';
import { CreateDiagnosisCodeDto } from './dto/create-diagnosis-code.dto';
import { UpdateDiagnosisCodeDto } from './dto/update-diagnosis-code.dto';

@Injectable()
export class DiagnosisCodeService {
  create(createDiagnosisCodeDto: CreateDiagnosisCodeDto) {
    return 'This action adds a new diagnosisCode';
  }

  findAll() {
    return `This action returns all diagnosisCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diagnosisCode`;
  }

  update(id: number, updateDiagnosisCodeDto: UpdateDiagnosisCodeDto) {
    return `This action updates a #${id} diagnosisCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosisCode`;
  }
}
