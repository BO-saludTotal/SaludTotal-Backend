import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalAttentionSpaceService } from './physical-attention-space.service';

describe('PhysicalAttentionSpaceService', () => {
  let service: PhysicalAttentionSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicalAttentionSpaceService],
    }).compile();

    service = module.get<PhysicalAttentionSpaceService>(PhysicalAttentionSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
