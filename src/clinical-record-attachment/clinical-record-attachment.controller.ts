import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { CreateClinicalRecordAttachmentDto } from './dto/create-clinical-record-attachment.dto';
import { UpdateClinicalRecordAttachmentDto } from './dto/update-clinical-record-attachment.dto';

@Controller('clinical-record-attachment')
export class ClinicalRecordAttachmentController {
  constructor(private readonly clinicalRecordAttachmentService: ClinicalRecordAttachmentService) {}

  @Post()
  create(@Body() createClinicalRecordAttachmentDto: CreateClinicalRecordAttachmentDto) {
    return this.clinicalRecordAttachmentService.create(createClinicalRecordAttachmentDto);
  }

  @Get()
  findAll() {
    return this.clinicalRecordAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalRecordAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicalRecordAttachmentDto: UpdateClinicalRecordAttachmentDto) {
    return this.clinicalRecordAttachmentService.update(+id, updateClinicalRecordAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalRecordAttachmentService.remove(+id);
  }
}
