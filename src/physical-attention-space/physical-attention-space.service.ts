import { Injectable } from '@nestjs/common';
import { CreatePhysicalAttentionSpaceDto } from './dto/create-physical-attention-space.dto';
import { UpdatePhysicalAttentionSpaceDto } from './dto/update-physical-attention-space.dto';

@Injectable()
export class PhysicalAttentionSpaceService {
  create(createPhysicalAttentionSpaceDto: CreatePhysicalAttentionSpaceDto) {
    return 'This action adds a new physicalAttentionSpace';
  }

  findAll() {
    return `This action returns all physicalAttentionSpace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} physicalAttentionSpace`;
  }

  update(id: number, updatePhysicalAttentionSpaceDto: UpdatePhysicalAttentionSpaceDto) {
    return `This action updates a #${id} physicalAttentionSpace`;
  }

  remove(id: number) {
    return `This action removes a #${id} physicalAttentionSpace`;
  }
}
