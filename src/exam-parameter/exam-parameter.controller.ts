import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamParameterService } from './exam-parameter.service';
import { CreateExamParameterDto } from './dto/create-exam-parameter.dto';
import { UpdateExamParameterDto } from './dto/update-exam-parameter.dto';

@Controller('exam-parameter')
export class ExamParameterController {
  constructor(private readonly examParameterService: ExamParameterService) {}

  @Post()
  create(@Body() createExamParameterDto: CreateExamParameterDto) {
    return this.examParameterService.create(createExamParameterDto);
  }

  @Get()
  findAll() {
    return this.examParameterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examParameterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamParameterDto: UpdateExamParameterDto) {
    return this.examParameterService.update(+id, updateExamParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examParameterService.remove(+id);
  }
}
