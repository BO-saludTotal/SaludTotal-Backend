import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalAttentionSpaceController } from './physical-attention-space.controller';
import { PhysicalAttentionSpaceService } from './physical-attention-space.service';

describe('PhysicalAttentionSpaceController', () => {
  let controller: PhysicalAttentionSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalAttentionSpaceController],
      providers: [PhysicalAttentionSpaceService],
    }).compile();

    controller = module.get<PhysicalAttentionSpaceController>(PhysicalAttentionSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
