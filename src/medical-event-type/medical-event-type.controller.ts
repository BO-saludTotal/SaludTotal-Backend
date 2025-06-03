import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { MedicalEventTypeService } from './medical-event-type.service';
import { CreateMedicalEventTypeDto } from './dto/create-medical-event-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AllowedRoles } from '../auth/enums/allowed-roles.enum';

@Controller('medical-event-types')

export class MedicalEventTypeController {
  constructor(private readonly eventTypeService: MedicalEventTypeService) {}

  @Post()
  @Roles(AllowedRoles.Administrativo) 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() createDto: CreateMedicalEventTypeDto) {
    const eventType = await this.eventTypeService.create(createDto);
    return {
        statusCode: HttpStatus.CREATED,
        message: 'Tipo de evento médico creado exitosamente.',
        data: eventType
    };
  }

  @Get()

  async findAll() {
    const eventTypes = await this.eventTypeService.findAll();
    return {
        statusCode: HttpStatus.OK,
        data: eventTypes
    };
  }
}