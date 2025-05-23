import { Test, TestingModule } from '@nestjs/testing';
import { UserAssignedRoleService } from './user-assigned-role.service';

describe('UserAssignedRoleService', () => {
  let service: UserAssignedRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAssignedRoleService],
    }).compile();

    service = module.get<UserAssignedRoleService>(UserAssignedRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
