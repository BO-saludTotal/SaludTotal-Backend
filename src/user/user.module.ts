import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from '../entity/user';
import { Role } from '../entity/role';
import { UserAssignedRole } from '../entity/userAssignedRole';
import { UserPhone } from '../entity/userPhone';
import { UserEmail } from '../entity/userEmail';
//import { inheritPropertyInitializers } from '@nestjs/mapped-types';
import { PatientDetail } from 'src/entity/patientDetail';
import { DoctorDetail } from 'src/entity/doctorDetail';
import { GovernmentStaffDetail } from 'src/entity/governmentStaffDetail';
import { AdministrativeStaffDetail } from 'src/entity/administrativeStaffDetail';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      UserAssignedRole,
      UserPhone,
      UserEmail,
      PatientDetail,
      DoctorDetail,
      GovernmentStaffDetail,
      AdministrativeStaffDetail,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
