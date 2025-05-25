import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorSpecialtyCertificationService } from './doctor-specialty-certification.service';
import { CreateDoctorSpecialtyCertificationDto } from './dto/create-doctor-specialty-certification.dto';
import { UpdateDoctorSpecialtyCertificationDto } from './dto/update-doctor-specialty-certification.dto';

@Controller('doctor-specialty-certification')
export class DoctorSpecialtyCertificationController {
  constructor(private readonly doctorSpecialtyCertificationService: DoctorSpecialtyCertificationService) {}

  @Post()
  create(@Body() createDoctorSpecialtyCertificationDto: CreateDoctorSpecialtyCertificationDto) {
    return this.doctorSpecialtyCertificationService.create(createDoctorSpecialtyCertificationDto);
  }

  @Get()
  findAll() {
    return this.doctorSpecialtyCertificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorSpecialtyCertificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorSpecialtyCertificationDto: UpdateDoctorSpecialtyCertificationDto) {
    return this.doctorSpecialtyCertificationService.update(+id, updateDoctorSpecialtyCertificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorSpecialtyCertificationService.remove(+id);
  }
}
