import { Injectable } from '@nestjs/common';
import { CreateAttentionTypeDto } from './dto/create-attention-type.dto';
import { UpdateAttentionTypeDto } from './dto/update-attention-type.dto';

@Injectable()
export class AttentionTypeService {
  create(createAttentionTypeDto: CreateAttentionTypeDto) {
    return 'This action adds a new attentionType';
  }

  findAll() {
    return `This action returns all attentionType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attentionType`;
  }

  update(id: number, updateAttentionTypeDto: UpdateAttentionTypeDto) {
    return `This action updates a #${id} attentionType`;
  }

  remove(id: number) {
    return `This action removes a #${id} attentionType`;
  }
}
