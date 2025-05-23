import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttentionTypeService } from './attention-type.service';
import { CreateAttentionTypeDto } from './dto/create-attention-type.dto';
import { UpdateAttentionTypeDto } from './dto/update-attention-type.dto';

@Controller('attention-type')
export class AttentionTypeController {
  constructor(private readonly attentionTypeService: AttentionTypeService) {}

  @Post()
  create(@Body() createAttentionTypeDto: CreateAttentionTypeDto) {
    return this.attentionTypeService.create(createAttentionTypeDto);
  }

  @Get()
  findAll() {
    return this.attentionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attentionTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttentionTypeDto: UpdateAttentionTypeDto) {
    return this.attentionTypeService.update(+id, updateAttentionTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attentionTypeService.remove(+id);
  }
}
