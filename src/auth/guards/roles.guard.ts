
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AllowedRoles } from '../enums/allowed-roles.enum';

interface AuthenticatedUserPayload { 
  userId: string;
  username: string;
  roles: string[]; 
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AllowedRoles[]>(ROLES_KEY, [
      context.getHandler(), 
      context.getClass(),   
    ]);


    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUserPayload; 

    if (!user || !user.roles) {

      throw new ForbiddenException('No tienes los permisos necesarios (roles no encontrados en el token).');
    }


    const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));

    if (!hasRequiredRole) {
      throw new ForbiddenException(`No tienes los permisos necesarios. Roles requeridos: ${requiredRoles.join(', ')}.`);
    }

    return true;
  }
}