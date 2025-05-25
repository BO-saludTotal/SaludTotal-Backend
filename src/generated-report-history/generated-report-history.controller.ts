import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneratedReportHistoryService } from './generated-report-history.service';
import { CreateGeneratedReportHistoryDto } from './dto/create-generated-report-history.dto';
import { UpdateGeneratedReportHistoryDto } from './dto/update-generated-report-history.dto';

@Controller('generated-report-history')
export class GeneratedReportHistoryController {
  constructor(private readonly generatedReportHistoryService: GeneratedReportHistoryService) {}

  @Post()
  create(@Body() createGeneratedReportHistoryDto: CreateGeneratedReportHistoryDto) {
    return this.generatedReportHistoryService.create(createGeneratedReportHistoryDto);
  }

  @Get()
  findAll() {
    return this.generatedReportHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generatedReportHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneratedReportHistoryDto: UpdateGeneratedReportHistoryDto) {
    return this.generatedReportHistoryService.update(+id, updateGeneratedReportHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generatedReportHistoryService.remove(+id);
  }
}
