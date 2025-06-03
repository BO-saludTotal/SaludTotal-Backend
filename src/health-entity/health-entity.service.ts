import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthEntity } from '../entity/healthEntity';
import { CreateHealthEntityDto } from './dto/create-health-entity.dto';

@Injectable()
export class HealthEntityService {
  constructor(
    @InjectRepository(HealthEntity)
    private readonly healthEntityRepository: Repository<HealthEntity>,
  ) {}

  async create(createDto: CreateHealthEntityDto): Promise<HealthEntity> {
    const existing = await this.healthEntityRepository.findOneBy({ officialName: createDto.officialName });
    if (existing) {
      throw new ConflictException(`La entidad de salud con nombre "${createDto.officialName}" ya existe.`);
    }
    const newEntity = this.healthEntityRepository.create(createDto);
    return this.healthEntityRepository.save(newEntity);
  }

  async findAll(): Promise<HealthEntity[]> {
    return this.healthEntityRepository.find();
  }
  
}
