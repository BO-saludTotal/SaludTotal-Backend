import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhysicalAttentionSpaceService } from './physical-attention-space.service';
import { CreatePhysicalAttentionSpaceDto } from './dto/create-physical-attention-space.dto';
import { UpdatePhysicalAttentionSpaceDto } from './dto/update-physical-attention-space.dto';

@Controller('physical-attention-space')
export class PhysicalAttentionSpaceController {
  constructor(private readonly physicalAttentionSpaceService: PhysicalAttentionSpaceService) {}

  @Post()
  create(@Body() createPhysicalAttentionSpaceDto: CreatePhysicalAttentionSpaceDto) {
    return this.physicalAttentionSpaceService.create(createPhysicalAttentionSpaceDto);
  }

  @Get()
  findAll() {
    return this.physicalAttentionSpaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicalAttentionSpaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhysicalAttentionSpaceDto: UpdatePhysicalAttentionSpaceDto) {
    return this.physicalAttentionSpaceService.update(+id, updatePhysicalAttentionSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicalAttentionSpaceService.remove(+id);
  }
}
