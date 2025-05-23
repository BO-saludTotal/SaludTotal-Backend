import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentChangeHistoryService } from './appointment-change-history.service';
import { CreateAppointmentChangeHistoryDto } from './dto/create-appointment-change-history.dto';
import { UpdateAppointmentChangeHistoryDto } from './dto/update-appointment-change-history.dto';

@Controller('appointment-change-history')
export class AppointmentChangeHistoryController {
  constructor(private readonly appointmentChangeHistoryService: AppointmentChangeHistoryService) {}

  @Post()
  create(@Body() createAppointmentChangeHistoryDto: CreateAppointmentChangeHistoryDto) {
    return this.appointmentChangeHistoryService.create(createAppointmentChangeHistoryDto);
  }

  @Get()
  findAll() {
    return this.appointmentChangeHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentChangeHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentChangeHistoryDto: UpdateAppointmentChangeHistoryDto) {
    return this.appointmentChangeHistoryService.update(+id, updateAppointmentChangeHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentChangeHistoryService.remove(+id);
  }
}
