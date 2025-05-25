import { Test, TestingModule } from '@nestjs/testing';
import { AttentionTypeService } from './attention-type.service';

describe('AttentionTypeService', () => {
  let service: AttentionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttentionTypeService],
    }).compile();

    service = module.get<AttentionTypeService>(AttentionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
