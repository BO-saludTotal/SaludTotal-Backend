import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalSpecialtyService } from './medical-specialty.service';
import { CreateMedicalSpecialtyDto } from './dto/create-medical-specialty.dto';
import { UpdateMedicalSpecialtyDto } from './dto/update-medical-specialty.dto';

@Controller('medical-specialty')
export class MedicalSpecialtyController {
  constructor(private readonly medicalSpecialtyService: MedicalSpecialtyService) {}

  @Post()
  create(@Body() createMedicalSpecialtyDto: CreateMedicalSpecialtyDto) {
    return this.medicalSpecialtyService.create(createMedicalSpecialtyDto);
  }

  @Get()
  findAll() {
    return this.medicalSpecialtyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalSpecialtyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalSpecialtyDto: UpdateMedicalSpecialtyDto) {
    return this.medicalSpecialtyService.update(+id, updateMedicalSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalSpecialtyService.remove(+id);
  }
}
