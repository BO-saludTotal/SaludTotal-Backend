import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministrativeStaffDetailService } from './administrative-staff-detail.service';
import { CreateAdministrativeStaffDetailDto } from './dto/create-administrative-staff-detail.dto';
import { UpdateAdministrativeStaffDetailDto } from './dto/update-administrative-staff-detail.dto';

@Controller('administrative-staff-detail')
export class AdministrativeStaffDetailController {
  constructor(private readonly administrativeStaffDetailService: AdministrativeStaffDetailService) {}

  @Post()
  create(@Body() createAdministrativeStaffDetailDto: CreateAdministrativeStaffDetailDto) {
    return this.administrativeStaffDetailService.create(createAdministrativeStaffDetailDto);
  }

  @Get()
  findAll() {
    return this.administrativeStaffDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administrativeStaffDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministrativeStaffDetailDto: UpdateAdministrativeStaffDetailDto) {
    return this.administrativeStaffDetailService.update(+id, updateAdministrativeStaffDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administrativeStaffDetailService.remove(+id);
  }
}
