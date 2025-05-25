import { Test, TestingModule } from '@nestjs/testing';
import { UserPhoneController } from './user-phone.controller';
import { UserPhoneService } from './user-phone.service';

describe('UserPhoneController', () => {
  let controller: UserPhoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPhoneController],
      providers: [UserPhoneService],
    }).compile();

    controller = module.get<UserPhoneController>(UserPhoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
