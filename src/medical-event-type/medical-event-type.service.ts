import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common'; 
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
    try { // Añadir try-catch para errores de guardado
        const newEventType = this.eventTypeRepository.create(createDto);
        return await this.eventTypeRepository.save(newEventType);
    } catch (error) {
        console.error("Error guardando tipo de evento médico:", error);
        throw new InternalServerErrorException('Error al guardar el tipo de evento médico.');
    }
  }

  async findAll(): Promise<MedicalEventType[]> {
    try {
        return await this.eventTypeRepository.find();
    } catch (error) {
        console.error("Error obteniendo todos los tipos de evento médico:", error);
        throw new InternalServerErrorException('Error al obtener los tipos de evento médico.');
    }
  }

 
  async findOne(id: number): Promise<MedicalEventType | null> { 
    const eventType = await this.eventTypeRepository.findOneBy({ id });
    if (!eventType) {

    }
    return eventType;
  }
}