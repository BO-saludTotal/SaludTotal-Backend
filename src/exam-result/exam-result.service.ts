import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ExamResult } from '../entity/examResult';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { ExamResultDetail } from '../entity/examResultDetail';
import { ExamParameter } from '../entity/examParameter';

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
    @InjectRepository(ExamResultDetail)
    private readonly examResultDetailRepository: Repository<ExamResultDetail>,
    @InjectRepository(ClinicalRecordEntry)
    private readonly entryRepository: Repository<ClinicalRecordEntry>,
    @InjectRepository(ExamParameter)
    private readonly examParameterRepository: Repository<ExamParameter>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    entryId: number,
    createDto: CreateExamResultDto,
  ): Promise<ExamResult> {
    const recordEntry = await this.entryRepository.findOneBy({ id: entryId });
    if (!recordEntry) {
      throw new NotFoundException(`Entrada de historial con ID ${entryId} no encontrada.`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newExamResultEntity = queryRunner.manager.create(ExamResult, {
        clinicalRecordEntryId: entryId,
        generalExamName: createDto.generalExamName,
        resultIssueDate: createDto.resultIssueDate ? new Date(createDto.resultIssueDate) : null,
      });
      const savedExamResult = await queryRunner.manager.save(newExamResultEntity);

      const parameterDetails: ExamResultDetail[] = [];
      for (const paramDto of createDto.parameters) {
        const examParam = await this.examParameterRepository.findOneBy({ id: paramDto.examParameterId });
        if (!examParam) {
          throw new BadRequestException(`Parámetro de examen con ID ${paramDto.examParameterId} no encontrado.`);
        }
        const detail = queryRunner.manager.create(ExamResultDetail, {
          examResultId: savedExamResult.id,
          examParameterId: paramDto.examParameterId,
          obtainedValue: paramDto.obtainedValue,
        });
        parameterDetails.push(await queryRunner.manager.save(detail));
      }

      await queryRunner.commitTransaction();
      savedExamResult.parameterDetails = parameterDetails;
      return savedExamResult;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Error creando resultado de exámen:", error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al crear el resultado del exámen.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByEntryId(entryId: number): Promise<ExamResult[]> {
    return this.examResultRepository.find({
      where: { clinicalRecordEntryId: entryId },
      relations: {
        parameterDetails: {
          examParameter: true,
        },
      },
      order: { resultIssueDate: 'DESC' , id: 'DESC' } 
    });
  }

  async findOne(examResultId: number): Promise<ExamResult> {
    const examResult = await this.examResultRepository.findOne({
      where: { id: examResultId },
      relations: {
        parameterDetails: {
          examParameter: true,
        },
      },
    });
    if (!examResult) {
      throw new NotFoundException(`Resultado de exámen con ID ${examResultId} no encontrado.`);
    }
    return examResult;
  }

  async remove(examResultId: number): Promise<void> {
    const examResult = await this.findOne(examResultId);
    await this.examResultRepository.remove(examResult);
  }
}