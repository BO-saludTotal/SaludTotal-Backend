import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorDetailService } from './doctor-detail.service';
import { CreateDoctorDetailDto } from './dto/create-doctor-detail.dto';
import { UpdateDoctorDetailDto } from './dto/update-doctor-detail.dto';

@Controller('doctor-detail')
export class DoctorDetailController {
  constructor(private readonly doctorDetailService: DoctorDetailService) {}

  @Post()
  create(@Body() createDoctorDetailDto: CreateDoctorDetailDto) {
    return this.doctorDetailService.create(createDoctorDetailDto);
  }

  @Get()
  findAll() {
    return this.doctorDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDetailDto: UpdateDoctorDetailDto) {
    return this.doctorDetailService.update(+id, updateDoctorDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorDetailService.remove(+id);
  }
}
