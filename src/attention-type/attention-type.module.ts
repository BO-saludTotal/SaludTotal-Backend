import { Module } from '@nestjs/common';
import { AttentionTypeService } from './attention-type.service';
import { AttentionTypeController } from './attention-type.controller';

@Module({
  controllers: [AttentionTypeController],
  providers: [AttentionTypeService],
})
export class AttentionTypeModule {}
