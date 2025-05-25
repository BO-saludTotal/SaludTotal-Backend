import { Test, TestingModule } from '@nestjs/testing';
import { UserAssignedRoleController } from './user-assigned-role.controller';
import { UserAssignedRoleService } from './user-assigned-role.service';

describe('UserAssignedRoleController', () => {
  let controller: UserAssignedRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAssignedRoleController],
      providers: [UserAssignedRoleService],
    }).compile();

    controller = module.get<UserAssignedRoleController>(UserAssignedRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
