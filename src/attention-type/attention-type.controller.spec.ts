import { Test, TestingModule } from '@nestjs/testing';
import { AttentionTypeController } from './attention-type.controller';
import { AttentionTypeService } from './attention-type.service';

describe('AttentionTypeController', () => {
  let controller: AttentionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttentionTypeController],
      providers: [AttentionTypeService],
    }).compile();

    controller = module.get<AttentionTypeController>(AttentionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
