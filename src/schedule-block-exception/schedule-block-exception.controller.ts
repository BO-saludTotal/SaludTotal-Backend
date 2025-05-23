import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleBlockExceptionService } from './schedule-block-exception.service';
import { CreateScheduleBlockExceptionDto } from './dto/create-schedule-block-exception.dto';
import { UpdateScheduleBlockExceptionDto } from './dto/update-schedule-block-exception.dto';

@Controller('schedule-block-exception')
export class ScheduleBlockExceptionController {
  constructor(private readonly scheduleBlockExceptionService: ScheduleBlockExceptionService) {}

  @Post()
  create(@Body() createScheduleBlockExceptionDto: CreateScheduleBlockExceptionDto) {
    return this.scheduleBlockExceptionService.create(createScheduleBlockExceptionDto);
  }

  @Get()
  findAll() {
    return this.scheduleBlockExceptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleBlockExceptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleBlockExceptionDto: UpdateScheduleBlockExceptionDto) {
    return this.scheduleBlockExceptionService.update(+id, updateScheduleBlockExceptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleBlockExceptionService.remove(+id);
  }
}
