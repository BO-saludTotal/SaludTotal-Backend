import {
  Controller,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateClinicalRecordEntryDto } from 'src/clinical-record-entry/dto/create-clinical-record-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllowedRoles } from 'src/auth/enums/allowed-roles.enum';
import { Request } from 'express';
import { GetHistoryDto } from './dto/get-history.dto';

interface AuthenticatedRequest extends Request {
  user: { userId: string; username: string; roles: string[] };
}

@Controller('patients/:patientId/medical-history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @Post('entries')
  @Roles(AllowedRoles.Medico)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async createMedicalEntry(
    @Param('patientId', ParseUUIDPipe) patientId: string,
    @Body() createDto: CreateClinicalRecordEntryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const attendingDoctorId = request.user.userId;
    try {
      const newEntry = await this.medicalHistoryService.createEntry(
        patientId,
        attendingDoctorId,
        createDto,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Entrada de historial clínico creada exitosamente.',
        data: newEntry,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(
        `Error en POST /patients/${patientId}/medical-history/entries:`,
        error,
      );
      throw new HttpException(
        'Error interno del servidor al crear la entrada del historial.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('entries')
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async getPatientHistoryEntries(
    @Param('patientId', ParseUUIDPipe) patientIdFromUrl: string,
    @Req() request: AuthenticatedRequest,
    @Body() getHistoryDto: GetHistoryDto,
  ) {
    const authenticatedUser = request.user;

    if (
      !authenticatedUser.roles.includes(AllowedRoles.Medico as string) &&
      authenticatedUser.userId !== patientIdFromUrl
    ) {
      throw new ForbiddenException(
        'Los pacientes solo pueden acceder a su propio historial clínico.',
      );
    }

    try {
      const entries = await this.medicalHistoryService.getPatientHistoryEntries(
        patientIdFromUrl,
        getHistoryDto.medicalEventType,
      );
      if (!entries || entries.length === 0) {
        return {
          statusCode: HttpStatus.OK,
          message:
            'No se encontraron entradas en el historial para este paciente.',
          data: [],
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: entries,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(
        `Error en GET /patients/${patientIdFromUrl}/medical-history/entries:`,
        error,
      );
      throw new HttpException(
        'Error interno del servidor al obtener el historial clínico.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
