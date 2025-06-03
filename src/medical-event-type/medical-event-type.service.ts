import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalEventType } from '../entity/medicalEventType';
import { CreateMedicalEventTypeDto } from './dto/create-medical-event-type.dto';

@Injectable()
export class MedicalEventTypeService {
  constructor(
    @InjectRepository(MedicalEventType)
    private readonly eventTypeRepository: Repository<MedicalEventType>,
  ) {}

  async create(createDto: CreateMedicalEventTypeDto): Promise<MedicalEventType> {
    const existing = await this.eventTypeRepository.findOneBy({ eventTypeName: createDto.eventTypeName });
    if (existing) {
      throw new ConflictException(`El tipo de evento médico "${createDto.eventTypeName}" ya existe.`);
    }
    const newEventType = this.eventTypeRepository.create(createDto);
    return this.eventTypeRepository.save(newEventType);
  }

  async findAll(): Promise<MedicalEventType[]> {
    return this.eventTypeRepository.find();
  }
}