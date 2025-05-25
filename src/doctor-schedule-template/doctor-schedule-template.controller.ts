import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorScheduleTemplateService } from './doctor-schedule-template.service';
import { CreateDoctorScheduleTemplateDto } from './dto/create-doctor-schedule-template.dto';
import { UpdateDoctorScheduleTemplateDto } from './dto/update-doctor-schedule-template.dto';

@Controller('doctor-schedule-template')
export class DoctorScheduleTemplateController {
  constructor(private readonly doctorScheduleTemplateService: DoctorScheduleTemplateService) {}

  @Post()
  create(@Body() createDoctorScheduleTemplateDto: CreateDoctorScheduleTemplateDto) {
    return this.doctorScheduleTemplateService.create(createDoctorScheduleTemplateDto);
  }

  @Get()
  findAll() {
    return this.doctorScheduleTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorScheduleTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorScheduleTemplateDto: UpdateDoctorScheduleTemplateDto) {
    return this.doctorScheduleTemplateService.update(+id, updateDoctorScheduleTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorScheduleTemplateService.remove(+id);
  }
}
