import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportTypeService } from './report-type.service';
import { CreateReportTypeDto } from './dto/create-report-type.dto';
import { UpdateReportTypeDto } from './dto/update-report-type.dto';

@Controller('report-type')
export class ReportTypeController {
  constructor(private readonly reportTypeService: ReportTypeService) {}

  @Post()
  create(@Body() createReportTypeDto: CreateReportTypeDto) {
    return this.reportTypeService.create(createReportTypeDto);
  }

  @Get()
  findAll() {
    return this.reportTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportTypeDto: UpdateReportTypeDto) {
    return this.reportTypeService.update(+id, updateReportTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportTypeService.remove(+id);
  }
}
