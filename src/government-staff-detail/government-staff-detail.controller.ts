import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GovernmentStaffDetailService } from './government-staff-detail.service';
import { CreateGovernmentStaffDetailDto } from './dto/create-government-staff-detail.dto';
import { UpdateGovernmentStaffDetailDto } from './dto/update-government-staff-detail.dto';

@Controller('government-staff-detail')
export class GovernmentStaffDetailController {
  constructor(private readonly governmentStaffDetailService: GovernmentStaffDetailService) {}

  @Post()
  create(@Body() createGovernmentStaffDetailDto: CreateGovernmentStaffDetailDto) {
    return this.governmentStaffDetailService.create(createGovernmentStaffDetailDto);
  }

  @Get()
  findAll() {
    return this.governmentStaffDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.governmentStaffDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGovernmentStaffDetailDto: UpdateGovernmentStaffDetailDto) {
    return this.governmentStaffDetailService.update(+id, updateGovernmentStaffDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.governmentStaffDetailService.remove(+id);
  }
}
