import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { UpdateMedicalAppointmentDto } from './dto/update-medical-appointment.dto';
import { MedicalAppointment } from 'src/entity/medicalAppointment';

@Controller('medical-appointment')
export class MedicalAppointmentController {
  constructor(private readonly medicalAppointmentService: MedicalAppointmentService) {}

  @Post()
  create(@Body() createMedicalAppointmentDto: MedicalAppointment) {
    return this.medicalAppointmentService.create(createMedicalAppointmentDto);
  }

  @Get()
  findAll() {
    return this.medicalAppointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalAppointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalAppointmentDto: UpdateMedicalAppointmentDto) {
    return this.medicalAppointmentService.update(+id, updateMedicalAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalAppointmentService.remove(+id);
  }
}
