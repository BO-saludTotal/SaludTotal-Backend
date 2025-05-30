import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ILike, Or, Brackets } from 'typeorm';
import { User, AccountStatusType } from '../entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserAssignedRole } from '../entity/userAssignedRole';
import { Role } from 'src/entity/role';
import { UserPhone } from 'src/entity/userPhone';
import { UserEmail } from 'src/entity/userEmail';
import { PatientDetail } from 'src/entity/patientDetail';
import { SearchUserQueryDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PatientDetail) 
    private readonly patientDetailRepository: Repository<PatientDetail>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      username,
      password,
      fullName,
      roleId,
      phones = [],
      emails = [],
    } = createUserDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = await queryRunner.manager.findOneBy(Role, { id: roleId });
      if (!role) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException(`Rol con ID ${roleId} no encontrado.`);
      }
      const existingUserByUsername = await queryRunner.manager.findOne(User, {
        where: { username },
      });
      if (existingUserByUsername) {
        await queryRunner.rollbackTransaction();
        throw new ConflictException('El nombre de usuario ya está en uso.');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUserEntity = queryRunner.manager.create(User, {
        username,
        passwordHash: hashedPassword,
        fullName,
        accountStatus: 'PendienteVerificacion' as AccountStatusType,
      });
      const savedUser = await queryRunner.manager.save(User, newUserEntity);
      const userRoleAssignment = queryRunner.manager.create(UserAssignedRole, {
        userId: savedUser.id,
        roleId: role.id,
      });
      await queryRunner.manager.save(UserAssignedRole, userRoleAssignment);
      for (const phoneDto of phones) {
        const newUserPhone = queryRunner.manager.create(UserPhone, {
          userId: savedUser.id,
          phoneNumber: phoneDto.phoneNumber,
          phoneType: phoneDto.phoneType,
          isPrimary: phoneDto.isPrimary ?? false,
        });
        await queryRunner.manager.save(UserPhone, newUserPhone);
      }
      for (const emailDto of emails) {

        const newUserEmail = queryRunner.manager.create(UserEmail, {
          userId: savedUser.id,
          emailAddress: emailDto.emailAddress,
          isPrimary: emailDto.isPrimary ?? false,
          isVerified: false,
        });
        await queryRunner.manager.save(UserEmail, newUserEmail);
      }
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error creando usuario en UsersService:', error);
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ocurrió un error inesperado al crear el usuario.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        assignedRoles: {
          role: true,
        },
      },
    });
  }
  
  async search(queryDto: SearchUserQueryDto): Promise<User[]> {
  const { query, ci, phoneNumber, email } = queryDto;

  const queryBuilder = this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.patientDetail', 'patientDetail')
    .leftJoinAndSelect('user.assignedRoles', 'assignedRoles')
    .leftJoinAndSelect('assignedRoles.role', 'role')
    .leftJoin('user.phones', 'userPhone')
    .leftJoin('user.emails', 'userEmail');

  queryBuilder.where('role.name = :roleName', { roleName: 'Paciente' });

    if (query || ci || phoneNumber || email) {
      queryBuilder.andWhere(new Brackets(qb => { 
        let isFirstOrCondition = true;

        const applyOr = (condition: Brackets | string, params?: object) => {
          if (condition instanceof Brackets) {
            if (isFirstOrCondition) {
              qb.where(condition);
              isFirstOrCondition = false;
            } else {
              qb.orWhere(condition);
            }
          } else {
            if (isFirstOrCondition) {
              qb.where(condition, params);
              isFirstOrCondition = false;
            } else {
              qb.orWhere(condition, params);
            }
          }
        };

        if (query) {
          const queryConditions = new Brackets(innerQb => {
            innerQb.where('user.fullName ILIKE :query', { query: `%${query}%` })
                  .orWhere('user.username ILIKE :query', { query: `%${query}%` });
          });
          applyOr(queryConditions);
        }

        if (ci) {
          applyOr('patientDetail.ci = :ci', { ci });
        }

        if (phoneNumber) {
          applyOr('userPhone.phoneNumber = :phoneNumber', { phoneNumber });
        }

        if (email) {
          applyOr('userEmail.emailAddress = :email', { email });
        }
      }));
    }

    queryBuilder.distinct(true);

    queryBuilder.select([
      'user.id',
      'user.fullName',
      'user.username',
      'patientDetail.birthDate',
      'patientDetail.gender',
    ]);

    return queryBuilder.getMany();
  }

   
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        assignedRoles: { role: true },
        patientDetail: true, 
        phones: true,
        emails: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }
    return user;
  }


  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .leftJoinAndSelect('user.assignedRoles', 'assignedRoles')
      .leftJoinAndSelect('assignedRoles.role', 'role')
      .where('user.username = :username', { username })
      .getOne();
    return user ?? undefined;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const updateData: Partial<User> = {};

    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );

      updateData.passwordHash = updateUserDto.password;
      delete updateUserDto.password;
    }

    if (updateUserDto.username) updateData.username = updateUserDto.username;
    if (updateUserDto.fullName) updateData.fullName = updateUserDto.fullName;
    if (updateUserDto.accountStatus)
      updateData.accountStatus = updateUserDto.accountStatus;

    Object.assign(user, updateData);



    try {
      await this.userRepository.save(user); 
      return this.findOne(id); 
    } catch (error: any) {
      if (
   
        error?.code === 'ER_DUP_ENTRY' ||
   
        error?.message?.includes?.('unique constraint')
      ) {
        throw new ConflictException('El nombre de usuario ya está en uso.');
      }
      console.error('Error actualizando usuario:', error);
      throw new InternalServerErrorException('Error al actualizar el usuario.');
    }
  }


  async remove(id: string): Promise<{ message: string; id: string }> {
    const user = await this.findOne(id); 
    try {
      await this.userRepository.remove(user); 
      return { message: `Usuario con ID "${id}" eliminado correctamente.`, id };
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw new InternalServerErrorException('Error al eliminar el usuario.');
    }
  }
   
}
