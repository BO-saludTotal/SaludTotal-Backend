import { Injectable } from '@nestjs/common';
import { CreateGeneratedReportHistoryDto } from './dto/create-generated-report-history.dto';
import { UpdateGeneratedReportHistoryDto } from './dto/update-generated-report-history.dto';

@Injectable()
export class GeneratedReportHistoryService {
  create(createGeneratedReportHistoryDto: CreateGeneratedReportHistoryDto) {
    return 'This action adds a new generatedReportHistory';
  }

  findAll() {
    return `This action returns all generatedReportHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generatedReportHistory`;
  }

  update(id: number, updateGeneratedReportHistoryDto: UpdateGeneratedReportHistoryDto) {
    return `This action updates a #${id} generatedReportHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} generatedReportHistory`;
  }
}
