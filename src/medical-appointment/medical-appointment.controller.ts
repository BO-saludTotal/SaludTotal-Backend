import {
  Controller, Post, Body, UseGuards, Req,
  HttpStatus, UsePipes, ValidationPipe, ParseIntPipe, Param, Get, Patch, Delete, HttpCode
} from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { CreateMedicalAppointmentDto } from './dto/create-medical-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guards/roles.guard';    
import { Roles } from '../auth/decorators/roles.decorator'; 
import { AllowedRoles } from '../auth/enums/allowed-roles.enum'; 
import { Request } from 'express'; 
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';

interface AuthenticatedRequest extends Request {
  user: { userId: string; username: string; roles: string[]; };
}

@Controller('medical-appointments') 
@UseGuards(JwtAuthGuard, RolesGuard) 
export class MedicalAppointmentController {
  constructor(private readonly appointmentService: MedicalAppointmentService) {}

  @Post() 
  @Roles(AllowedRoles.Paciente) 
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

  @Get('/my-appointments') 
  @Roles(AllowedRoles.Paciente)
  async findMyCitas(@Req() request: AuthenticatedRequest) {
    const patientUserId = request.user.userId;
    const appointments = await this.appointmentService.findMyAppointments(patientUserId);
    return { statusCode: HttpStatus.OK, data: appointments };
  }

  @Get(':appointmentId') 
  @Roles(AllowedRoles.Paciente, AllowedRoles.Medico) 
  async findOne(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Req() request: AuthenticatedRequest 
  ) {
    const requestingUserId = request.user.userId;
    const userRoles = request.user.roles;
    const appointment = await this.appointmentService.findOne(appointmentId, requestingUserId, userRoles);
    return { statusCode: HttpStatus.OK, data: appointment };
  }

  @Patch(':appointmentId/reschedule') 
  @Roles(AllowedRoles.Paciente) 
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async reschedule(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Req() request: AuthenticatedRequest,
    @Body() rescheduleDto: RescheduleAppointmentDto,
  ) {
    const patientUserId = request.user.userId;
    const updatedAppointment = await this.appointmentService.reschedule(appointmentId, patientUserId, rescheduleDto);
    return {
        statusCode: HttpStatus.OK,
        message: 'Cita reprogramada exitosamente.',
        data: updatedAppointment
    };
  }

 
  @Post(':appointmentId/cancel')
  @Roles(AllowedRoles.Paciente, AllowedRoles.Medico) //el paciente o medico pueden cancelar
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async cancel(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Req() request: AuthenticatedRequest,
    @Body() cancelDto: CancelAppointmentDto,
  ) {
    const requestingUserId = request.user.userId;
    const userRoles = request.user.roles;
    await this.appointmentService.cancel(appointmentId, requestingUserId, userRoles, cancelDto);
    return {
        statusCode: HttpStatus.OK, 
        message: 'Cita cancelada exitosamente.'
    };
  }

}