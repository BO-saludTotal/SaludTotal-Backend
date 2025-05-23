import { Test, TestingModule } from '@nestjs/testing';
import { UserAdressController } from './user-adress.controller';
import { UserAdressService } from './user-adress.service';

describe('UserAdressController', () => {
  let controller: UserAdressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAdressController],
      providers: [UserAdressService],
    }).compile();

    controller = module.get<UserAdressController>(UserAdressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
