import { Injectable } from '@nestjs/common';
import { CreateScheduleBlockExceptionDto } from './dto/create-schedule-block-exception.dto';
import { UpdateScheduleBlockExceptionDto } from './dto/update-schedule-block-exception.dto';

@Injectable()
export class ScheduleBlockExceptionService {
  create(createScheduleBlockExceptionDto: CreateScheduleBlockExceptionDto) {
    return 'This action adds a new scheduleBlockException';
  }

  findAll() {
    return `This action returns all scheduleBlockException`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduleBlockException`;
  }

  update(id: number, updateScheduleBlockExceptionDto: UpdateScheduleBlockExceptionDto) {
    return `This action updates a #${id} scheduleBlockException`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduleBlockException`;
  }
}
