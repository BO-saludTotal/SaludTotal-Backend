import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorHealthEntityAffiliationService } from './doctor-health-entity-affiliation.service';
import { CreateDoctorHealthEntityAffiliationDto } from './dto/create-doctor-health-entity-affiliation.dto';
import { UpdateDoctorHealthEntityAffiliationDto } from './dto/update-doctor-health-entity-affiliation.dto';

@Controller('doctor-health-entity-affiliation')
export class DoctorHealthEntityAffiliationController {
  constructor(private readonly doctorHealthEntityAffiliationService: DoctorHealthEntityAffiliationService) {}

  @Post()
  create(@Body() createDoctorHealthEntityAffiliationDto: CreateDoctorHealthEntityAffiliationDto) {
    return this.doctorHealthEntityAffiliationService.create(createDoctorHealthEntityAffiliationDto);
  }

  @Get()
  findAll() {
    return this.doctorHealthEntityAffiliationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorHealthEntityAffiliationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorHealthEntityAffiliationDto: UpdateDoctorHealthEntityAffiliationDto) {
    return this.doctorHealthEntityAffiliationService.update(+id, updateDoctorHealthEntityAffiliationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorHealthEntityAffiliationService.remove(+id);
  }
}
