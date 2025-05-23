import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicalRecordDiagnosisService } from './clinical-record-diagnosis.service';
import { CreateClinicalRecordDiagnosisDto } from './dto/create-clinical-record-diagnosis.dto';
import { UpdateClinicalRecordDiagnosisDto } from './dto/update-clinical-record-diagnosis.dto';

@Controller('clinical-record-diagnosis')
export class ClinicalRecordDiagnosisController {
  constructor(private readonly clinicalRecordDiagnosisService: ClinicalRecordDiagnosisService) {}

  @Post()
  create(@Body() createClinicalRecordDiagnosisDto: CreateClinicalRecordDiagnosisDto) {
    return this.clinicalRecordDiagnosisService.create(createClinicalRecordDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.clinicalRecordDiagnosisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalRecordDiagnosisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicalRecordDiagnosisDto: UpdateClinicalRecordDiagnosisDto) {
    return this.clinicalRecordDiagnosisService.update(+id, updateClinicalRecordDiagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalRecordDiagnosisService.remove(+id);
  }
}
