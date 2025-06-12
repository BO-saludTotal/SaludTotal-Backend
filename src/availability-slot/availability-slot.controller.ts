import { Controller, Get, Query, UsePipes, ValidationPipe, UseGuards, HttpStatus } from '@nestjs/common';
import { AvailabilitySlotService } from './availability-slot.service';
import { SearchAvailableSlotsDto } from './dto/search-availability-slot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
// import { RolesGuard } from '../auth/guards/roles.guard'; 
// import { Roles } from '../auth/decorators/roles.decorator';
// import { AllowedRoles } from '../auth/enums/allowed-roles.enum';

@Controller('availability-slots') 
export class AvailabilitySlotController {
  constructor(private readonly slotService: AvailabilitySlotService) {}

  @Get('search/available') 
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, skipMissingProperties: true }))
  async findAvailableSlots(@Query() searchDto: SearchAvailableSlotsDto) {
    const slots = await this.slotService.findAvailable(searchDto);
    return {
        statusCode: HttpStatus.OK,
        message: 'Slots de disponibilidad encontrados.',
        data: slots
    };
  }

}