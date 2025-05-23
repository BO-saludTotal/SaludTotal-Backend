import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamResultDetailService } from './exam-result-detail.service';
import { CreateExamResultDetailDto } from './dto/create-exam-result-detail.dto';
import { UpdateExamResultDetailDto } from './dto/update-exam-result-detail.dto';

@Controller('exam-result-detail')
export class ExamResultDetailController {
  constructor(private readonly examResultDetailService: ExamResultDetailService) {}

  @Post()
  create(@Body() createExamResultDetailDto: CreateExamResultDetailDto) {
    return this.examResultDetailService.create(createExamResultDetailDto);
  }

  @Get()
  findAll() {
    return this.examResultDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examResultDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamResultDetailDto: UpdateExamResultDetailDto) {
    return this.examResultDetailService.update(+id, updateExamResultDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examResultDetailService.remove(+id);
  }
}
