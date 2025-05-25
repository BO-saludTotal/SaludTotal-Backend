import { Module } from '@nestjs/common';
import { UserAssignedRoleService } from './user-assigned-role.service';
import { UserAssignedRoleController } from './user-assigned-role.controller';

@Module({
  controllers: [UserAssignedRoleController],
  providers: [UserAssignedRoleService],
})
export class UserAssignedRoleModule {}
