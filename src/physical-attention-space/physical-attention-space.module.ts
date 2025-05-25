import { Module } from '@nestjs/common';
import { PhysicalAttentionSpaceService } from './physical-attention-space.service';
import { PhysicalAttentionSpaceController } from './physical-attention-space.controller';

@Module({
  controllers: [PhysicalAttentionSpaceController],
  providers: [PhysicalAttentionSpaceService],
})
export class PhysicalAttentionSpaceModule {}
