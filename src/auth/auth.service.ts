import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../entity/user';
import { DoctorHealthEntityAffiliation } from 'src/entity/doctorHealthEntityAffiliation';
import { AdministrativeStaffDetail } from 'src/entity/administrativeStaffDetail';
import { GovernmentStaffDetail } from 'src/entity/governmentStaffDetail';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
//import { LoginResponse } from './interfaces/login-response.interface';
import { UsersService } from 'src/user/user.service';

export interface LoginResponsePayload {
  accessToken: string;
  user: {
    id: string;
    username: string;
    fullName: string;
    roles: string[];
  };
}
export interface JwtAuthPayload {
  sub: string;
  username: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(DoctorHealthEntityAffiliation)
    private readonly doctorAffliationRepository: Repository<DoctorHealthEntityAffiliation>,
    @InjectRepository(AdministrativeStaffDetail)
    private readonly administrativeStaffRepository: Repository<AdministrativeStaffDetail>,
    @InjectRepository(GovernmentStaffDetail)
    private readonly governmentStaffRepository: Repository<GovernmentStaffDetail>,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, plainPassword: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .leftJoinAndSelect('user.assignedRoles', 'assignedRoles')
      .leftJoinAndSelect('assignedRoles.role', 'roleEntity')
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas (usuario)');
    }

    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      user.passwordHash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas (contraseña)');
    }
    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponsePayload> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const roleNames = user.assignedRoles
      ? user.assignedRoles.map((ar) => ar.role.name)
      : [];
    if (roleNames.includes('Doctor')) {
      if (!loginDto.affiliationCode) {
        throw new UnauthorizedException(
          'Se requiere codigo de afiliacion para el doctor',
        );
      }
      const [doctorId, healthEntityId] = loginDto.affiliationCode.split('-');
      const doctorHealthEntityAffiliation =
        await this.doctorAffliationRepository.findOne({
          where: {
            doctorUserId: doctorId,
            healthEntityId: Number(healthEntityId),
          },
        });
      if (!doctorHealthEntityAffiliation) {
        throw new UnauthorizedException('Doctor no encontrado.');
      }
    }
    if (roleNames.includes('GovernmentStaff')) {
      if (!loginDto.credentialId) {
        throw new UnauthorizedException('credencial necesaria');
      }
      const governmentStaffDetail =
        await this.governmentStaffRepository.findOne({
          where: {
            governmentUserId: loginDto.credentialId,
          },
        });
      if (!governmentStaffDetail) {
        throw new UnauthorizedException('Doctor no encontrado.');
      }
    }
    if (roleNames.includes('AdministrativeStaff')) {
      if (!loginDto.credentialId) {
        throw new UnauthorizedException('credencial necesaria');
      }
      const administrativeStaffDetail =
        await this.administrativeStaffRepository.findOne({
          where: {
            adminUserId: loginDto.credentialId,
          },
        });
      if (!administrativeStaffDetail) {
        throw new UnauthorizedException('Doctor no encontrado.');
      }
    }
    const jwtPayload: JwtAuthPayload = {
      sub: user.id,
      username: user.username,
      roles: roleNames,
    };

    const accessToken = this.jwtService.sign(jwtPayload);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        roles: roleNames,
      },
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.error('Error durante el registro en AuthService:', error);
      throw error;
    }
  }

  async registerRaro(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.createRaro(createUserDto);
    } catch (error) {
      console.error('Error durante el registro en AuthService:', error);
      throw error;
    }
  }
}
