import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, HttpStatus,NotFoundException, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
// import { UpdateExamResultDto } from './dto/update-exam-result.dto'; // Si implementas update
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllowedRoles } from 'src/auth/enums/allowed-roles.enum';

@Controller('medical-history/entries/:entryId/exam-results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  @Post()
  @Roles(AllowedRoles.Medico) // O quien pueda registrar resultados
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Body() createDto: CreateExamResultDto,
  ) {
    const examResult = await this.examResultService.create(entryId, createDto);
    return {
        statusCode: HttpStatus.CREATED,
        message: 'Resultado de exámen añadido exitosamente.',
        data: examResult
    };
  }

  @Get()
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findAll(@Param('entryId', ParseIntPipe) entryId: number) {
    // Considerar lógica de autorización para paciente
    const examResults = await this.examResultService.findAllByEntryId(entryId);
    return { statusCode: HttpStatus.OK, data: examResults };
  }

  @Get(':examResultId')
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findOne(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Param('examResultId', ParseIntPipe) examResultId: number,
  ) {
    const examResult = await this.examResultService.findOne(examResultId);
    if (examResult.clinicalRecordEntryId !== entryId) {
        throw new NotFoundException('Resultado de exámen no encontrado para esta entrada de historial.');
    }
    return { statusCode: HttpStatus.OK, data: examResult };
  }

  @Delete(':examResultId')
  @Roles(AllowedRoles.Medico) // O quien pueda eliminar
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Param('examResultId', ParseIntPipe) examResultId: number,
  ) {
    // Validar que examResultId pertenezca a entryId antes de eliminar
    await this.examResultService.remove(examResultId);
  }
}