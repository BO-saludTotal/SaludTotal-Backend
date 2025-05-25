import { Test, TestingModule } from '@nestjs/testing';
import { UserPhoneService } from './user-phone.service';

describe('UserPhoneService', () => {
  let service: UserPhoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPhoneService],
    }).compile();

    service = module.get<UserPhoneService>(UserPhoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
