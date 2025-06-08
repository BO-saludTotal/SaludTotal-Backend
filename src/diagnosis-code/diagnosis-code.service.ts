import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalRecordDiagnosis } from '../entity/clinicalRecordDiagnosis';
import { CreateClinicalRecordDiagnosisDto } from './dto/create-diagnosis-code.dto';
import { UpdateClinicalRecordDiagnosisDto } from './dto/update-diagnosis-code.dto';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { DiagnosisCode } from '../entity/diagnosisCode';

@Injectable()
export class ClinicalRecordDiagnosisService {
  constructor(
    @InjectRepository(ClinicalRecordDiagnosis)
    private readonly diagnosisRepository: Repository<ClinicalRecordDiagnosis>,
    @InjectRepository(ClinicalRecordEntry)
    private readonly entryRepository: Repository<ClinicalRecordEntry>,
    @InjectRepository(DiagnosisCode)
    private readonly diagnosisCodeRepository: Repository<DiagnosisCode>,
  ) {}

  async create(
    entryId: number,
    createDto: CreateClinicalRecordDiagnosisDto,
  ): Promise<ClinicalRecordDiagnosis> {
    const recordEntry = await this.entryRepository.findOneBy({ id: entryId });
    if (!recordEntry) {
      throw new NotFoundException(`Entrada de historial con ID ${entryId} no encontrada.`);
    }
    const diagnosisCode = await this.diagnosisCodeRepository.findOneBy({ cieCode: createDto.cieCode });
    if (!diagnosisCode) {
      throw new BadRequestException(`Código CIE "${createDto.cieCode}" no encontrado.`);
    }


    const existing = await this.diagnosisRepository.findOneBy({
        clinicalRecordEntryId: entryId,
        cieCode: createDto.cieCode
    });
    if (existing) {
        throw new BadRequestException(`Este diagnóstico CIE ya está registrado para esta entrada de historial.`);
    }

    const newDiagnosis = this.diagnosisRepository.create({
      clinicalRecordEntryId: entryId,
      ...createDto,

    });
    return this.diagnosisRepository.save(newDiagnosis);
  }

  async findAllByEntryId(entryId: number): Promise<ClinicalRecordDiagnosis[]> {
    return this.diagnosisRepository.find({
      where: { clinicalRecordEntryId: entryId },
      relations: ['diagnosisCode'], 
    });
  }

  async findOne(entryId: number, cieCode: string): Promise<ClinicalRecordDiagnosis> {
    const diagnosis = await this.diagnosisRepository.findOne({
      where: { clinicalRecordEntryId: entryId, cieCode: cieCode },
      relations: ['diagnosisCode'],
    });
    if (!diagnosis) {
      throw new NotFoundException(`Diagnóstico con CIE ${cieCode} para la entrada ${entryId} no encontrado.`);
    }
    return diagnosis;
  }

  async update(
    entryId: number,
    cieCode: string,
    updateDto: UpdateClinicalRecordDiagnosisDto,
  ): Promise<ClinicalRecordDiagnosis> {
    const diagnosis = await this.findOne(entryId, cieCode); 

    if (updateDto.diagnosisType) {
        diagnosis.diagnosisType = updateDto.diagnosisType;
    }

    return this.diagnosisRepository.save(diagnosis);
  }

  async remove(entryId: number, cieCode: string): Promise<void> {
    const diagnosis = await this.findOne(entryId, cieCode);
    await this.diagnosisRepository.remove(diagnosis);
  }
}