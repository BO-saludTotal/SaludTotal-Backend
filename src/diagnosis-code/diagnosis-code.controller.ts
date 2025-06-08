import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, UseGuards, ParseIntPipe, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClinicalRecordDiagnosisService } from './diagnosis-code.service';
import { CreateClinicalRecordDiagnosisDto } from './dto/create-diagnosis-code.dto';
import { UpdateClinicalRecordDiagnosisDto } from './dto/update-diagnosis-code.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllowedRoles } from 'src/auth/enums/allowed-roles.enum';

@Controller('medical-history/entries/:entryId/diagnoses') // Ruta anidada
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicalRecordDiagnosisController {
  constructor(private readonly diagnosisService: ClinicalRecordDiagnosisService) {}

  @Post()
  @Roles(AllowedRoles.Medico)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Body() createDto: CreateClinicalRecordDiagnosisDto,
  ) {
    const diagnosis = await this.diagnosisService.create(entryId, createDto);
    return {
        statusCode: HttpStatus.CREATED,
        message: 'Diagnóstico añadido exitosamente a la entrada del historial.',
        data: diagnosis
    };
  }

  @Get()
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente) 
  async findAll(@Param('entryId', ParseIntPipe) entryId: number) {

    const diagnoses = await this.diagnosisService.findAllByEntryId(entryId);
    return { statusCode: HttpStatus.OK, data: diagnoses };
  }

  @Get(':cieCode') 
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findOne(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Param('cieCode') cieCode: string,
  ) {
    const diagnosis = await this.diagnosisService.findOne(entryId, cieCode);
    return { statusCode: HttpStatus.OK, data: diagnosis };
  }

  @Patch(':cieCode')
  @Roles(AllowedRoles.Medico)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, skipMissingProperties: true }))
  async update(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Param('cieCode') cieCode: string,
    @Body() updateDto: UpdateClinicalRecordDiagnosisDto,
  ) {
    const updatedDiagnosis = await this.diagnosisService.update(entryId, cieCode, updateDto);
    return {
        statusCode: HttpStatus.OK,
        message: 'Diagnóstico actualizado exitosamente.',
        data: updatedDiagnosis
    };
  }

  @Delete(':cieCode')
  @Roles(AllowedRoles.Medico)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Param('cieCode') cieCode: string,
  ) {
    await this.diagnosisService.remove(entryId, cieCode);

  }
}