import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthEntitySpecialtyService } from './health-entity-specialty.service';
import { CreateHealthEntitySpecialtyDto } from './dto/create-health-entity-specialty.dto';
import { UpdateHealthEntitySpecialtyDto } from './dto/update-health-entity-specialty.dto';

@Controller('health-entity-specialty')
export class HealthEntitySpecialtyController {
  constructor(private readonly healthEntitySpecialtyService: HealthEntitySpecialtyService) {}

  @Post()
  create(@Body() createHealthEntitySpecialtyDto: CreateHealthEntitySpecialtyDto) {
    return this.healthEntitySpecialtyService.create(createHealthEntitySpecialtyDto);
  }

  @Get()
  findAll() {
    return this.healthEntitySpecialtyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthEntitySpecialtyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthEntitySpecialtyDto: UpdateHealthEntitySpecialtyDto) {
    return this.healthEntitySpecialtyService.update(+id, updateHealthEntitySpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthEntitySpecialtyService.remove(+id);
  }
}
