/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
//import { UserPhone } from 'src/entity/userPhone';
//import { UserEmail } from 'src/entity/userEmail';
import { PatientDetail } from 'src/entity/patientDetail';
import { DoctorDetail } from 'src/entity/doctorDetail';
import { SearchUserQueryDto } from './dto/search-user.dto';
import { GovernmentStaffDetail } from 'src/entity/governmentStaffDetail';
import { AdministrativeStaffDetail } from 'src/entity/administrativeStaffDetail';

function isUuid(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(value);
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PatientDetail)
    private readonly patientDetailRepository: Repository<PatientDetail>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(DoctorDetail)
    private readonly doctorDetailRepository: Repository<DoctorDetail>,
    @InjectRepository(GovernmentStaffDetail)
    private readonly governmentStaffDetail: Repository<GovernmentStaffDetail>,
    @InjectRepository(AdministrativeStaffDetail)
    private readonly administrativeStaffDetailRepository: Repository<AdministrativeStaffDetail>,
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

      fechaNacimiento,
      genero,
      direccionResidencia,
      nombresPadresTutores,

      numeroColegiado,

      cargoAdministrativo,
      entidadSaludIdAsignada,

      nombreInstitucionGubernamental,
      cargoEnInstitucion,
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

      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10),
      );

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

      if (role.id === 2) {
        const patientDetailData: Partial<PatientDetail> = {
          patientUserId: savedUser.id,
        };
        if (fechaNacimiento)
          patientDetailData.birthDate = new Date(fechaNacimiento);
        if (genero) patientDetailData.gender = genero as any;
        if (direccionResidencia)
          patientDetailData.residentialAddress = direccionResidencia;
        if (nombresPadresTutores)
          patientDetailData.parentOrGuardianNames = nombresPadresTutores;

        const newPatientDetail = queryRunner.manager.create(
          PatientDetail,
          patientDetailData,
        );
        await queryRunner.manager.save(PatientDetail, newPatientDetail);
      } else if (role.id === 3) {
        if (!numeroColegiado) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException(
            'Número de colegiado es requerido para Médico.',
          );
        }
        const doctorDetailData: Partial<DoctorDetail> = {
          doctorUserId: savedUser.id,
          medicalLicenseNumber: numeroColegiado,
        };
        const newDoctorDetail = queryRunner.manager.create(
          DoctorDetail,
          doctorDetailData,
        );
        await queryRunner.manager.save(DoctorDetail, newDoctorDetail);
      } else if (role.id === 1) {
        if (!nombreInstitucionGubernamental || !cargoEnInstitucion) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException(
            'Nombre de institución y cargo son requeridos para personal gubernamental.',
          );
        }
        const govDetailData: Partial<GovernmentStaffDetail> = {
          governmentUserId: savedUser.id,
          governmentalInstitutionName: nombreInstitucionGubernamental,
          positionInInstitution: cargoEnInstitucion,
        };
        const newGovDetail = queryRunner.manager.create(
          GovernmentStaffDetail,
          govDetailData,
        );
        await queryRunner.manager.save(GovernmentStaffDetail, newGovDetail);
      } else if (role.id === 4) {
        if (!cargoAdministrativo) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException(
            'El cargo administrativo es requerido para este rol.',
          );
        }
        const adminDetailData: Partial<AdministrativeStaffDetail> = {
          adminUserId: savedUser.id,
          administrativePosition: cargoAdministrativo,
        };
        if (entidadSaludIdAsignada !== undefined) {
          adminDetailData.assignedHealthEntityId = entidadSaludIdAsignada;
        }
        const newAdminDetail = queryRunner.manager.create(
          AdministrativeStaffDetail,
          adminDetailData,
        );
        await queryRunner.manager.save(
          AdministrativeStaffDetail,
          newAdminDetail,
        );
      }

      await queryRunner.commitTransaction();

      const createdUserWithDetails = await this.userRepository.findOneOrFail({
        where: { id: savedUser.id },
        relations: {
          assignedRoles: { role: true },
          patientDetail: true,
          doctorDetail: true,
          administrativeStaffDetail: true,
          governmentStaffDetail: true,
          phones: true,
          emails: true,
        },
      });
      return createdUserWithDetails;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear usuario');
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
    const { query } = queryDto;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.patientDetail', 'patientDetail')
      .leftJoinAndSelect('user.assignedRoles', 'assignedRoles')
      .leftJoinAndSelect('assignedRoles.role', 'role');

    queryBuilder.where('role.name = :roleName', { roleName: 'Paciente' });

    if (query) {
      if (isUuid(query)) {
        queryBuilder.andWhere('user.id = :userIdQuery', { userIdQuery: query });
      } else {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('user.fullName ILIKE :textQuery', {
              textQuery: `%${query}%`,
            }).orWhere('user.username ILIKE :textQuery', {
              textQuery: `%${query}%`,
            });
          }),
        );
      }
    }

    queryBuilder.distinct(true);

    queryBuilder.select([
      'user.id',
      'user.fullName',
      'user.username',
      'patientDetail.birthDate',
      'patientDetail.gender',
      'role.name',
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
