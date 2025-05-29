// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../entity/user'; // Ajusta la ruta
import { DoctorHealthEntityAffiliation } from 'src/entity/doctorHealthEntityAffiliation';
import { AdministrativeStaffDetail } from 'src/entity/administrativeStaffDetail';
import { GovernmentStaffDetail } from 'src/entity/governmentStaffDetail';
// Importa tus interfaces si las tienes separadas
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
    @InjectRepository(User) // <--- INYECTA EL REPOSITORIO DE USER
    @InjectRepository(GovernmentStaffDetail)
    @InjectRepository(AdministrativeStaffDetail)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly doctorAffliationRepository: Repository<DoctorHealthEntityAffiliation>,
    private readonly administrativeStaffRepository: Repository<AdministrativeStaffDetail>,
    private readonly governmentStaffRepository: Repository<GovernmentStaffDetail>,
  ) {}

  async validateUser(username: string, plainPassword: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash') // Asegura que passwordHash se seleccione
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

  // Si el registro también se maneja en AuthService (lo cual es común)
  // y no tienes un UsersService separado para la creación.
  // async register(registerDto: RegisterDto): Promise<User> { // RegisterDto sería igual a CreateUserDto
  //   const { username, password, fullName, roleId, /* phones, emails */ } = registerDto;

  //   // Verificar si el rol existe (usando this.userRepository o inyectando RoleRepository)
  //   // Verificar si el nombre de usuario ya existe (usando this.userRepository)
  //   // Hashear contraseña
  //   // Crear y guardar la instancia de User usando this.userRepository.create() y this.userRepository.save()
  //   // Crear y guardar UserAssignedRole, UserPhone, UserEmail (probablemente dentro de una transacción)

  //   // const salt = await bcrypt.genSalt();
  //   // const hashedPassword = await bcrypt.hash(password, salt);
  //   // const newUser = this.userRepository.create({
  //   //   username,
  //   //   passwordHash: hashedPassword,
  //   //   fullName,
  //   //   // ... y otros campos
  //   // });
  //   // const savedUser = await this.userRepository.save(newUser);
  //   // // Aquí necesitarías la lógica para roles, teléfonos, emails
  //   // return savedUser; // Recuerda manejar el @Exclude de passwordHash
  // }
}
