import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthEntityService } from './health-entity.service';
import { CreateHealthEntityDto } from './dto/create-health-entity.dto';
import { UpdateHealthEntityDto } from './dto/update-health-entity.dto';

@Controller('health-entity')
export class HealthEntityController {
  constructor(private readonly healthEntityService: HealthEntityService) {}

  @Post()
  create(@Body() createHealthEntityDto: CreateHealthEntityDto) {
    return this.healthEntityService.create(createHealthEntityDto);
  }

  @Get()
  findAll() {
    return this.healthEntityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthEntityDto: UpdateHealthEntityDto) {
    return this.healthEntityService.update(+id, updateHealthEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthEntityService.remove(+id);
  }
}
