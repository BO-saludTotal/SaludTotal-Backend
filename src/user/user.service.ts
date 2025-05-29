import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User, AccountStatusType } from '../entity/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserAssignedRole } from '../entity/userAssignedRole';
import { Role } from 'src/entity/role';
import { UserPhone } from 'src/entity/userPhone';
import { UserEmail } from 'src/entity/userEmail';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
        /* ... lógica de emails ... */
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
      /* ... manejo de error ... */
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

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        assignedRoles: {
          role: true,
        },
        phones: true, // Ejemplo para cargar teléfonos
        emails: true, // Ejemplo para cargar emails
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

    //const updateData: Partial<User> = { ...updateUserDto };
    //if ((updateData as any).passwordHash) { // Si hasheamos la contraseña
    //  user.passwordHash = (updateData as any).passwordHash;
    //}
    //if (updateData.username) user.username = updateData.username;
    //if (updateData.fullName) user.fullName = updateData.fullName;
    //if (updateData.accountStatus) user.accountStatus = updateData.accountStatus;

    try {
      await this.userRepository.save(user); // Guardar la entidad 'user' modificada
      return this.findOne(id); // Devolver la entidad actualizada con sus relaciones
    } catch (error: any) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error?.code === 'ER_DUP_ENTRY' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        error?.message?.includes?.('unique constraint')
      ) {
        throw new ConflictException('El nombre de usuario ya está en uso.');
      }
      console.error('Error actualizando usuario:', error);
      throw new InternalServerErrorException('Error al actualizar el usuario.');
    }
  }

  // --- MÉTODO REMOVE ---
  async remove(id: string): Promise<{ message: string; id: string }> {
    const user = await this.findOne(id); // Asegura que el usuario exista antes de intentar eliminar
    try {
      await this.userRepository.remove(user); // O .delete(id) si no necesitas la entidad antes
      return { message: `Usuario con ID "${id}" eliminado correctamente.`, id };
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw new InternalServerErrorException('Error al eliminar el usuario.');
    }
  }
}
