import { Injectable } from '@nestjs/common';
import { CreateAvailabilitySlotDto } from './dto/create-availability-slot.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';

@Injectable()
export class AvailabilitySlotService {
  create(createAvailabilitySlotDto: CreateAvailabilitySlotDto) {
    return 'This action adds a new availabilitySlot';
  }

  findAll() {
    return `This action returns all availabilitySlot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availabilitySlot`;
  }

  update(id: number, updateAvailabilitySlotDto: UpdateAvailabilitySlotDto) {
    return `This action updates a #${id} availabilitySlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} availabilitySlot`;
  }
}
