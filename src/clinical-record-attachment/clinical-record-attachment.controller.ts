import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClinicalRecordAttachmentService } from './clinical-record-attachment.service';
import { CreateClinicalRecordAttachmentDto } from './dto/create-clinical-record-attachment.dto';
import { UpdateClinicalRecordAttachmentDto } from './dto/update-clinical-record-attachment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'src/cloudinary/cloudinary.storage';

@Controller('clinical-record-attachment')
export class ClinicalRecordAttachmentController {
  constructor(
    private readonly clinicalRecordAttachmentService: ClinicalRecordAttachmentService,
  ) {}
  /*
  @UseInterceptors(FileInterceptor('archivo'))
  @Post()
  create(@UploadedFile() file: Express.Multer.File) {
    console.log('Archivo recibido:', file);
    return { file };
  }
*/
  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    createClinicalRecordAttachmentDto: CreateClinicalRecordAttachmentDto,
  ) {
    console.log('Archivo recibido:', file);
    console.log('DTO recibido:', createClinicalRecordAttachmentDto);
    return this.clinicalRecordAttachmentService.create(
      file,
      createClinicalRecordAttachmentDto,
    );
  }
  @Get()
  findAll() {
    return this.clinicalRecordAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalRecordAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateClinicalRecordAttachmentDto: UpdateClinicalRecordAttachmentDto,
  ) {
    return this.clinicalRecordAttachmentService.update(
      +id,
      updateClinicalRecordAttachmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalRecordAttachmentService.remove(+id);
  }
}
