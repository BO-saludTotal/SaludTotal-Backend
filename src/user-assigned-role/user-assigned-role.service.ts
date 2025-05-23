import { Injectable } from '@nestjs/common';
import { CreateUserAssignedRoleDto } from './dto/create-user-assigned-role.dto';
import { UpdateUserAssignedRoleDto } from './dto/update-user-assigned-role.dto';

@Injectable()
export class UserAssignedRoleService {
  create(createUserAssignedRoleDto: CreateUserAssignedRoleDto) {
    return 'This action adds a new userAssignedRole';
  }

  findAll() {
    return `This action returns all userAssignedRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAssignedRole`;
  }

  update(id: number, updateUserAssignedRoleDto: UpdateUserAssignedRoleDto) {
    return `This action updates a #${id} userAssignedRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAssignedRole`;
  }
}
