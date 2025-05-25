import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalGeneralCatalogService } from './medical-general-catalog.service';
import { CreateMedicalGeneralCatalogDto } from './dto/create-medical-general-catalog.dto';
import { UpdateMedicalGeneralCatalogDto } from './dto/update-medical-general-catalog.dto';

@Controller('medical-general-catalog')
export class MedicalGeneralCatalogController {
  constructor(private readonly medicalGeneralCatalogService: MedicalGeneralCatalogService) {}

  @Post()
  create(@Body() createMedicalGeneralCatalogDto: CreateMedicalGeneralCatalogDto) {
    return this.medicalGeneralCatalogService.create(createMedicalGeneralCatalogDto);
  }

  @Get()
  findAll() {
    return this.medicalGeneralCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalGeneralCatalogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalGeneralCatalogDto: UpdateMedicalGeneralCatalogDto) {
    return this.medicalGeneralCatalogService.update(+id, updateMedicalGeneralCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalGeneralCatalogService.remove(+id);
  }
}
