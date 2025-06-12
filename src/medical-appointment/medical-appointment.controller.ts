import {
  Controller, Post, Body, UseGuards, Req,
  HttpStatus, UsePipes, ValidationPipe, ParseUUIDPipe, Param, Get, Patch, Delete, HttpCode
} from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guards/roles.guard';    
import { Roles } from '../auth/decorators/roles.decorator'; 
import { AllowedRoles } from '../auth/enums/allowed-roles.enum'; 
import { Request } from 'express'; 

interface AuthenticatedRequest extends Request {
  user: { userId: string; username: string; roles: string[]; };
}

@Controller('medical-appointments') 
@UseGuards(JwtAuthGuard, RolesGuard) 
export class MedicalAppointmentController {
  constructor(private readonly appointmentService: MedicalAppointmentService) {}

  @Post() 
  @Roles(AllowedRoles.Paciente) // Solo los pacientes pueden crear citas para sí mismos
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async createAppointment(
    @Req() request: AuthenticatedRequest,
    @Body() createDto: CreateMedicalAppointmentDto,
  ) {
    const patientUserId = request.user.userId;
    const appointment = await this.appointmentService.create(patientUserId, createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cita creada exitosamente.',
      data: appointment,
    };
  }

  // Podrías añadir más endpoints aquí después:
  // @Get('/my-appointments') // Para que un paciente vea sus citas
  // @Roles(AllowedRoles.Paciente)
  // async findMyCitas(@Req() request: AuthenticatedRequest) { /* ... */ }

  // @Get(':appointmentId') // Para ver detalle de una cita
  // @Roles(AllowedRoles.Paciente, AllowedRoles.Medico)
  // async findOne(@Param('appointmentId', ParseIntPipe) appointmentId: number, @Req() request: AuthenticatedRequest) { /* ... lógica de permisos ... */ }

  // @Patch(':appointmentId/reschedule') // Para reprogramar
  // @Roles(AllowedRoles.Paciente)
  // async reschedule(...) { /* ... */ }

  // @Delete(':appointmentId/cancel') // Para cancelar
  // @Roles(AllowedRoles.Paciente, AllowedRoles.Medico) // O un POST /cancel
  // async cancel(...) { /* ... */ }
}