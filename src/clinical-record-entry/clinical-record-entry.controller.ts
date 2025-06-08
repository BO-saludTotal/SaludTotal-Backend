import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicalRecordEntryService } from './clinical-record-entry.service';
import { CreateClinicalRecordEntryDto } from './dto/create-clinical-record-entry.dto';
import { UpdateClinicalRecordEntryDto } from './dto/update-clinical-record-entry.dto';

@Controller('clinical-record-entry')
export class ClinicalRecordEntryController {
  constructor(
    private readonly clinicalRecordEntryService: ClinicalRecordEntryService,
  ) {}

  @Post()
  create(@Body() createClinicalRecordEntryDto: CreateClinicalRecordEntryDto) {
    return this.clinicalRecordEntryService.create(createClinicalRecordEntryDto);
  }

  @Get()
  findAll() {
    return this.clinicalRecordEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalRecordEntryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClinicalRecordEntryDto: UpdateClinicalRecordEntryDto,
  ) {
    return this.clinicalRecordEntryService.update(
      +id,
      updateClinicalRecordEntryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalRecordEntryService.remove(+id);
  }
}
