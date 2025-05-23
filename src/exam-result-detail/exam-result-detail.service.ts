import { Injectable } from '@nestjs/common';
import { CreateExamResultDetailDto } from './dto/create-exam-result-detail.dto';
import { UpdateExamResultDetailDto } from './dto/update-exam-result-detail.dto';

@Injectable()
export class ExamResultDetailService {
  create(createExamResultDetailDto: CreateExamResultDetailDto) {
    return 'This action adds a new examResultDetail';
  }

  findAll() {
    return `This action returns all examResultDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examResultDetail`;
  }

  update(id: number, updateExamResultDetailDto: UpdateExamResultDetailDto) {
    return `This action updates a #${id} examResultDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} examResultDetail`;
  }
}
