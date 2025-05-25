import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAssignedRoleDto } from './create-user-assigned-role.dto';

export class UpdateUserAssignedRoleDto extends PartialType(CreateUserAssignedRoleDto) {}
