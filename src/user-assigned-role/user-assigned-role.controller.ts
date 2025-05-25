import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAssignedRoleService } from './user-assigned-role.service';
import { CreateUserAssignedRoleDto } from './dto/create-user-assigned-role.dto';
import { UpdateUserAssignedRoleDto } from './dto/update-user-assigned-role.dto';

@Controller('user-assigned-role')
export class UserAssignedRoleController {
  constructor(private readonly userAssignedRoleService: UserAssignedRoleService) {}

  @Post()
  create(@Body() createUserAssignedRoleDto: CreateUserAssignedRoleDto) {
    return this.userAssignedRoleService.create(createUserAssignedRoleDto);
  }

  @Get()
  findAll() {
    return this.userAssignedRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAssignedRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAssignedRoleDto: UpdateUserAssignedRoleDto) {
    return this.userAssignedRoleService.update(+id, updateUserAssignedRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAssignedRoleService.remove(+id);
  }
}
