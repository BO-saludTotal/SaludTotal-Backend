
import { SetMetadata } from '@nestjs/common';
import { AllowedRoles } from '../enums/allowed-roles.enum'; 

export const ROLES_KEY = 'roles'; 
export const Roles = (...roles: AllowedRoles[]) => SetMetadata(ROLES_KEY, roles);