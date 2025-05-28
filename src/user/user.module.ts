import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from '../entity/user';
import { Role } from '../entity/role';
import { UserAssignedRole } from '../entity/userAssignedRole';
import { UserPhone } from '../entity/userPhone';
import { UserEmail } from '../entity/userEmail';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserAssignedRole, UserPhone, UserEmail])],
  providers: [UsersService],
  controllers: [UsersController], 
  exports: [UsersService], 
})
export class UsersModule {}