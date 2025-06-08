import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalRecordAttachment } from '../entity/clinicalRecordAttachment';
import { CreateClinicalRecordAttachmentDto } from './dto/create-clinical-record-attachment.dto';
import { UpdateClinicalRecordAttachmentDto } from './dto/update-clinical-record-attachment.dto';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';

@Injectable()
export class ClinicalRecordAttachmentService {
  constructor(
    @InjectRepository(ClinicalRecordAttachment)
    private readonly attachmentRepository: Repository<ClinicalRecordAttachment>,
    @InjectRepository(ClinicalRecordEntry)
    private readonly entryRepository: Repository<ClinicalRecordEntry>,
  ) {}

  async create(
    entryId: number,
    createDto: CreateClinicalRecordAttachmentDto,
  ): Promise<ClinicalRecordAttachment> {
    const recordEntry = await this.entryRepository.findOneBy({ id: entryId });
    if (!recordEntry) {
      throw new NotFoundException(`Entrada de historial con ID ${entryId} no encontrada.`);
    }

    const newAttachment = this.attachmentRepository.create({
      clinicalRecordEntryId: entryId,
      ...createDto,
    });

    try {
      return await this.attachmentRepository.save(newAttachment);
    } catch (error) {
      console.error("Error guardando adjunto:", error);
      throw new InternalServerErrorException('Error al guardar el adjunto.');
    }
  }

  async findAllByEntryId(entryId: number): Promise<ClinicalRecordAttachment[]> {
    return this.attachmentRepository.find({
      where: { clinicalRecordEntryId: entryId },
      order: { id: 'ASC' } 
    });
  }

  async findOne(attachmentId: number): Promise<ClinicalRecordAttachment> {
    const attachment = await this.attachmentRepository.findOneBy({ id: attachmentId });
    if (!attachment) {
      throw new NotFoundException(`Adjunto con ID ${attachmentId} no encontrado.`);
    }
    return attachment;
  }

  async update(
    attachmentId: number,
    updateDto: UpdateClinicalRecordAttachmentDto,
  ): Promise<ClinicalRecordAttachment> {
    const attachment = await this.findOne(attachmentId); 
    
  
    if (updateDto.originalFileName !== undefined) {
        attachment.originalFileName = updateDto.originalFileName;
    }
    if (updateDto.mimeType !== undefined) {
        attachment.mimeType = updateDto.mimeType;
    }


    try {
        return await this.attachmentRepository.save(attachment);
    } catch (error) {
        console.error("Error actualizando adjunto:", error);
        throw new InternalServerErrorException('Error al actualizar el adjunto.');
    }
  }

  async remove(attachmentId: number): Promise<void> {
    const attachment = await this.findOne(attachmentId);

    await this.attachmentRepository.remove(attachment);
  }
}