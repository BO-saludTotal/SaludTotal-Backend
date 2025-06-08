import {
  Controller, Get, Post, Body, Patch, Param, Delete,NotFoundException,
  UseGuards, ParseIntPipe, HttpStatus, UsePipes, ValidationPipe, HttpCode,
  // Para subida de archivos Necesitariamos esto:
  // UploadedFile, UseInterceptors, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express'; // Para subida de archivos
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { CreateClinicalRecordAttachmentDto } from './dto/create-clinical-record-attachment.dto';
import { UpdateClinicalRecordAttachmentDto } from './dto/update-clinical-record-attachment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllowedRoles } from 'src/auth/enums/allowed-roles.enum';

@Controller('medical-history/entries/:entryId/attachments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicalRecordAttachmentController {
  constructor(private readonly attachmentService: ClinicalRecordAttachmentService) {}

  @Post()
  @Roles(AllowedRoles.Medico) 
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))

  async create(
    @Param('entryId', ParseIntPipe) entryId: number,
    @Body() createDto: CreateClinicalRecordAttachmentDto,
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
    //       new FileTypeValidator({ fileType: 'image/jpeg|image/png|application/pdf' }),
    //     ],
    //     fileIsRequired: true
    //   }),
    // ) file: Express.Multer.File, // Para obtener el archivo subido
  ) {
    // createDto.storagePath = 'ruta_generada_por_subida/' + file.filename;
    // createDto.originalFileName = file.originalname;
    // createDto.mimeType = file.mimetype;

    const attachment = await this.attachmentService.create(entryId, createDto);
    return {
        statusCode: HttpStatus.CREATED,
        message: 'Adjunto añadido exitosamente.',
        data: attachment
    };
  }

  @Get()
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findAll(@Param('entryId', ParseIntPipe) entryId: number) {
    const attachments = await this.attachmentService.findAllByEntryId(entryId);
    return { statusCode: HttpStatus.OK, data: attachments };
  }

  @Get(':attachmentId')
  @Roles(AllowedRoles.Medico, AllowedRoles.Paciente)
  async findOne(
    @Param('entryId', ParseIntPipe) entryId: number, 
    @Param('attachmentId', ParseIntPipe) attachmentId: number,
  ) {
    const attachment = await this.attachmentService.findOne(attachmentId);
    if (attachment.clinicalRecordEntryId !== entryId) {
        throw new NotFoundException('Adjunto no encontrado para esta entrada de historial.');
    }
    return { statusCode: HttpStatus.OK, data: attachment };
  }

  @Patch(':attachmentId')
  @Roles(AllowedRoles.Medico)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, skipMissingProperties: true }))
  async update(
    @Param('entryId', ParseIntPipe) entryId: number, 
    @Param('attachmentId', ParseIntPipe) attachmentId: number,
    @Body() updateDto: UpdateClinicalRecordAttachmentDto,
  ) {

    const existingAttachment = await this.attachmentService.findOne(attachmentId);
    if (existingAttachment.clinicalRecordEntryId !== entryId) {
        throw new NotFoundException('Adjunto no encontrado para esta entrada de historial.');
    }
    const updatedAttachment = await this.attachmentService.update(attachmentId, updateDto);
    return {
        statusCode: HttpStatus.OK,
        message: 'Metadatos del adjunto actualizados exitosamente.',
        data: updatedAttachment
    };
  }

  @Delete(':attachmentId')
  @Roles(AllowedRoles.Medico)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('entryId', ParseIntPipe) entryId: number, 
    @Param('attachmentId', ParseIntPipe) attachmentId: number,
  ) {

    const existingAttachment = await this.attachmentService.findOne(attachmentId);
    if (existingAttachment.clinicalRecordEntryId !== entryId) {
        throw new NotFoundException('Adjunto no encontrado para esta entrada de historial.');
    }
    await this.attachmentService.remove(attachmentId);

  }
}