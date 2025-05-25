import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralMedicationService } from './general-medication.service';
import { CreateGeneralMedicationDto } from './dto/create-general-medication.dto';
import { UpdateGeneralMedicationDto } from './dto/update-general-medication.dto';

@Controller('general-medication')
export class GeneralMedicationController {
  constructor(private readonly generalMedicationService: GeneralMedicationService) {}

  @Post()
  create(@Body() createGeneralMedicationDto: CreateGeneralMedicationDto) {
    return this.generalMedicationService.create(createGeneralMedicationDto);
  }

  @Get()
  findAll() {
    return this.generalMedicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalMedicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralMedicationDto: UpdateGeneralMedicationDto) {
    return this.generalMedicationService.update(+id, updateGeneralMedicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalMedicationService.remove(+id);
  }
}
