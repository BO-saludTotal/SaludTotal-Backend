import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalEventTypeService } from './medical-event-type.service';
import { CreateMedicalEventTypeDto } from './dto/create-medical-event-type.dto';
import { UpdateMedicalEventTypeDto } from './dto/update-medical-event-type.dto';

@Controller('medical-event-type')
export class MedicalEventTypeController {
  constructor(private readonly medicalEventTypeService: MedicalEventTypeService) {}

  @Post()
  create(@Body() createMedicalEventTypeDto: CreateMedicalEventTypeDto) {
    return this.medicalEventTypeService.create(createMedicalEventTypeDto);
  }

  @Get()
  findAll() {
    return this.medicalEventTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalEventTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalEventTypeDto: UpdateMedicalEventTypeDto) {
    return this.medicalEventTypeService.update(+id, updateMedicalEventTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalEventTypeService.remove(+id);
  }
}
