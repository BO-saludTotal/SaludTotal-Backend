import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionMedicationDetailService } from './prescription-medication-detail.service';
import { CreatePrescriptionMedicationDetailDto } from './dto/create-prescription-medication-detail.dto';
import { UpdatePrescriptionMedicationDetailDto } from './dto/update-prescription-medication-detail.dto';

@Controller('prescription-medication-detail')
export class PrescriptionMedicationDetailController {
  constructor(private readonly prescriptionMedicationDetailService: PrescriptionMedicationDetailService) {}

  @Post()
  create(@Body() createPrescriptionMedicationDetailDto: CreatePrescriptionMedicationDetailDto) {
    return this.prescriptionMedicationDetailService.create(createPrescriptionMedicationDetailDto);
  }

  @Get()
  findAll() {
    return this.prescriptionMedicationDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionMedicationDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionMedicationDetailDto: UpdatePrescriptionMedicationDetailDto) {
    return this.prescriptionMedicationDetailService.update(+id, updatePrescriptionMedicationDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionMedicationDetailService.remove(+id);
  }
}
