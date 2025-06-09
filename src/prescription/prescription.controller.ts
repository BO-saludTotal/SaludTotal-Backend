import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, HttpStatus,NotFoundException, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllowedRoles } from 'src/auth/enums/allowed-roles.enum';
import { ClinicalRecordEntry } from 'src/entity/clinicalRecordEntry';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('medical-history/entries/:entryId/prescriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrescriptionController {
  constructor(
    private readonly prescriptionService: PrescriptionService,
    
    @InjectRepository(ClinicalRecordEntry) 
    private readonly entryRepository: Repository<ClinicalRecordEntry>
  ) {}

  @Post()
  @Roles(AllowedRoles.Medico)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Body() createDto: CreatePrescriptionDto,
  ) {
    
    const recordEntry = await this.entryRepository.findOneBy({ id: entryId });
    if (!recordEntry) {
      throw new NotFoundException(`Entrada de historial con ID ${entryId} no encontrada.`);
    }


    const prescription = await this.prescriptionService.create(recordEntry, createDto); 
    return {
        statusCode: HttpStatus.CREATED,
        message: 'Prescripción añadida exitosamente.',
        data: prescription
    };
  }


  @Get()
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findAll(@Param('entryId', ParseIntPipe) entryId: number) {

    const prescriptions = await this.prescriptionService.findAllByEntryId(entryId);
    return { statusCode: HttpStatus.OK, data: prescriptions };
  }

  @Get(':prescriptionId')
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findOne(
    @Param('entryId', ParseIntPipe) entryId: number, 
    @Param('prescriptionId', ParseIntPipe) prescriptionId: number,
  ) {
    const prescription = await this.prescriptionService.findOne(prescriptionId);

    if (prescription.clinicalRecordEntryId !== entryId) { 
        throw new NotFoundException('Prescripción no encontrada para esta entrada de historial.');
    }
    return { statusCode: HttpStatus.OK, data: prescription };
  }

  @Delete(':prescriptionId')
  @Roles(AllowedRoles.Medico)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('entryId', ParseIntPipe) entryId: number, 
    @Param('prescriptionId', ParseIntPipe) prescriptionId: number,
  ) {

    await this.prescriptionService.remove(prescriptionId);
  }
}