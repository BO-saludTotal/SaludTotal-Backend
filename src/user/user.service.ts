import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async create(dto: CreateUserDto) {
    const {
      NombreUsuario,
      Contrasena,
      NombreCompleto,
      RolID,
      Telefonos = [],
      Correos = [],
    } = dto;

    const UsuarioID_UUID = uuidv4();
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Insertar en Usuarios
      await queryRunner.manager.query(
        `INSERT INTO Usuarios (UsuarioID, NombreUsuario, ContrasenaHash, NombreCompleto) 
         VALUES (?, ?, ?, ?)`,
        [UsuarioID_UUID, NombreUsuario, Contrasena, NombreCompleto],
      );

      // Insertar en UsuarioRolesAsignados
      await queryRunner.manager.query(
        `INSERT INTO UsuarioRolesAsignados (UsuarioID_Ref, RolID_Ref) 
         VALUES (?, ?)`,
        [UsuarioID_UUID, RolID],
      );

      // Insertar teléfonos
      for (const telefono of Telefonos) {
        await queryRunner.manager.query(
          `INSERT INTO TelefonosUsuario (UsuarioID_Ref, NumeroTelefono, TipoTelefono, EsPrincipal) 
           VALUES (?, ?, ?, ?)`,
          [
            UsuarioID_UUID,
            telefono.NumeroTelefono,
            telefono.TipoTelefono ?? null,
            telefono.EsPrincipal ?? false,
          ],
        );
      }

      // Insertar correos
      for (const correo of Correos) {
        await queryRunner.manager.query(
          `INSERT INTO CorreosElectronicosUsuario (UsuarioID_Ref, CorreoElectronico, EsPrincipal, Verificado) 
           VALUES (?, ?, ?, ?)`,
          [
            UsuarioID_UUID,
            correo.CorreoElectronico,
            correo.EsPrincipal ?? false,
            false,
          ],
        );
      }

      await queryRunner.commitTransaction();

      return {
        message: 'Usuario creado correctamente',
        UsuarioID: UsuarioID_UUID,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al crear usuario:', error.message);
        return {
          message: 'Error al crear usuario',
          error: error.message,
        };
      }

      console.error('Error desconocido al crear usuario:', error);
      return {
        message: 'Error desconocido al crear usuario',
      };
    } finally {
      await queryRunner.release();
    }
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /*update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
