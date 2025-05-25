import { Injectable } from '@nestjs/common';
import { CreateReportTypeDto } from './dto/create-report-type.dto';
import { UpdateReportTypeDto } from './dto/update-report-type.dto';

@Injectable()
export class ReportTypeService {
  create(createReportTypeDto: CreateReportTypeDto) {
    return 'This action adds a new reportType';
  }

  findAll() {
    return `This action returns all reportType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportType`;
  }

  update(id: number, updateReportTypeDto: UpdateReportTypeDto) {
    return `This action updates a #${id} reportType`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportType`;
  }
}
