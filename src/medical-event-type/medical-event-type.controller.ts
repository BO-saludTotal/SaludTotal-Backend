import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { MedicalEventTypeService } from './medical-event-type.service';
import { CreateMedicalEventTypeDto } from './dto/create-medical-event-type.dto'; // Asegúrate que este DTO exista
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllowedRoles } from 'src/auth/enums/allowed-roles.enum';

@Controller('medical-event-types') // <--- RUTA BASE DEL CONTROLADOR
export class MedicalEventTypeController {
  constructor(private readonly eventTypeService: MedicalEventTypeService) {}

  @Post() // <--- MÉTODO POST EN LA RUTA BASE (/medical-event-types)
  @Roles(AllowedRoles.Administrativo) // O el rol que deba tener permiso
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
  // @UseGuards(JwtAuthGuard) // Podrías protegerlo si quieres
  async findAll() {
    const eventTypes = await this.eventTypeService.findAll();
    return {
        statusCode: HttpStatus.OK,
        data: eventTypes
    };
  }
}