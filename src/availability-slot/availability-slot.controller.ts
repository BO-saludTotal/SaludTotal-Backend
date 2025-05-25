import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailabilitySlotService } from './availability-slot.service';
import { CreateAvailabilitySlotDto } from './dto/create-availability-slot.dto';
import { UpdateAvailabilitySlotDto } from './dto/update-availability-slot.dto';

@Controller('availability-slot')
export class AvailabilitySlotController {
  constructor(private readonly availabilitySlotService: AvailabilitySlotService) {}

  @Post()
  create(@Body() createAvailabilitySlotDto: CreateAvailabilitySlotDto) {
    return this.availabilitySlotService.create(createAvailabilitySlotDto);
  }

  @Get()
  findAll() {
    return this.availabilitySlotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilitySlotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailabilitySlotDto: UpdateAvailabilitySlotDto) {
    return this.availabilitySlotService.update(+id, updateAvailabilitySlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilitySlotService.remove(+id);
  }
}
