import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, MoreThanOrEqual, LessThanOrEqual, And } from 'typeorm';
import { AvailabilitySlot, SlotStatus } from '../entity/availabilitySlot'; 
import { SearchAvailableSlotsDto } from './dto/search-availability-slot.dto';
import { User } from '../entity/user'; 
import { DoctorSpecialtyCertification } from '../entity/doctorSpecialtyCertification'; 

@Injectable()
export class AvailabilitySlotService {
  constructor(
    @InjectRepository(AvailabilitySlot)
    private readonly slotRepository: Repository<AvailabilitySlot>,

  ) {}

  async findAvailable(dto: SearchAvailableSlotsDto): Promise<AvailabilitySlot[]> {
    const queryBuilder = this.slotRepository.createQueryBuilder('slot')
      .innerJoinAndSelect('slot.doctorUser', 'doctorUser') 
      .innerJoinAndSelect('doctorUser.doctorDetail', 'doctorDetail') 
      .leftJoinAndSelect('slot.healthEntity', 'healthEntity')
      .leftJoinAndSelect('slot.attentionSpace', 'attentionSpace')
      .leftJoinAndSelect('slot.offeredAttentionType', 'offeredAttentionType');

    
    queryBuilder.where('slot.status = :status', { status: 'Disponible' as SlotStatus });

    if (dto.dateFrom) {
 
      const startDate = new Date(dto.dateFrom);
      startDate.setHours(0, 0, 0, 0);
      queryBuilder.andWhere('slot.startDateTime >= :dateFrom', { dateFrom: startDate });
    }

    if (dto.dateTo) {

      const endDate = new Date(dto.dateTo);
      endDate.setHours(23, 59, 59, 999);
      queryBuilder.andWhere('slot.startDateTime <= :dateTo', { dateTo: endDate });
    }

    if (dto.healthEntityId) {
      queryBuilder.andWhere('slot.healthEntityId = :healthEntityId', { healthEntityId: dto.healthEntityId });
    }

    if (dto.doctorId) {
      queryBuilder.andWhere('slot.doctorUserId = :doctorId', { doctorId: dto.doctorId });
    }

    if (dto.attentionTypeId) {
      queryBuilder.andWhere('slot.offeredAttentionTypeId = :attentionTypeId', { attentionTypeId: dto.attentionTypeId });
    }

    if (dto.specialtyId) {

      queryBuilder.andWhere(qb => {
        const subQuery = qb.subQuery()
          .select('dsc.doctorUserId') 
          .from(DoctorSpecialtyCertification, 'dsc')
          .where('dsc.specialtyId = :specialtyId', { specialtyId: dto.specialtyId })
          .getQuery();
        return 'slot.doctorUserId IN ' + subQuery; 
      });
    }

    queryBuilder.orderBy('slot.startDateTime', 'ASC');

    return queryBuilder.getMany();
  }

}