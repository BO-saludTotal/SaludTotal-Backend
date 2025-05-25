import { Injectable } from '@nestjs/common';
import { CreateExamParameterDto } from './dto/create-exam-parameter.dto';
import { UpdateExamParameterDto } from './dto/update-exam-parameter.dto';

@Injectable()
export class ExamParameterService {
  create(createExamParameterDto: CreateExamParameterDto) {
    return 'This action adds a new examParameter';
  }

  findAll() {
    return `This action returns all examParameter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examParameter`;
  }

  update(id: number, updateExamParameterDto: UpdateExamParameterDto) {
    return `This action updates a #${id} examParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} examParameter`;
  }
}
