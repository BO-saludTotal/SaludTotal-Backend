import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { HealthEntityService } from './health-entity.service';
import { CreateHealthEntityDto } from './dto/create-health-entity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AllowedRoles } from '../auth/enums/allowed-roles.enum'; 

@Controller('health-entities')

export class HealthEntityController {
  constructor(private readonly healthEntityService: HealthEntityService) {}

  @Post()
  @Roles(AllowedRoles.Administrativo) 
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() createDto: CreateHealthEntityDto) {
    const entity = await this.healthEntityService.create(createDto);
    return {
        statusCode: HttpStatus.CREATED,
        message: 'Entidad de salud creada exitosamente.',
        data: entity
    };
  }

  @Get()

  async findAll() {
    const entities = await this.healthEntityService.findAll();
    return {
        statusCode: HttpStatus.OK,
        data: entities
    };
  }
}