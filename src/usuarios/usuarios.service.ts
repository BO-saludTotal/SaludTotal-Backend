import { Injectable } from '@nestjs/common';
import { pool } from '../db';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ResultSetHeader } from 'mysql2';

@Injectable()
export class UsuariosService {
  async crearUsuario(dto: CrearUsuarioDto) {
    const {
      NombreUsuario,
      Contrasena,
      NombreCompleto,
      RolID,
      Telefonos = [],
      Correos = [],
    } = dto;

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insertar en Usuarios
      const [usuarioResult] = await pool.query<ResultSetHeader>(
        `INSERT INTO Usuarios (NombreUsuario, ContrasenaHash, NombreCompleto)
         VALUES (?, ?, ?)`,
        [NombreUsuario, Contrasena, NombreCompleto],
      );

      const UsuarioID = usuarioResult.insertId;

      // Insertar en UsuarioRolesAsignados
      await connection.query(
        `INSERT INTO UsuarioRolesAsignados (UsuarioID_Ref, RolID_Ref)
         VALUES (?, ?)`,
        [UsuarioID, RolID],
      );

      // Insertar teléfonos
      for (const telefono of Telefonos) {
        await connection.query(
          `INSERT INTO TelefonosUsuario (UsuarioID_Ref, NumeroTelefono, TipoTelefono, EsPrincipal)
           VALUES (?, ?, ?, ?)`,
          [
            UsuarioID,
            telefono.NumeroTelefono,
            telefono.TipoTelefono ?? null,
            telefono.EsPrincipal ?? false,
          ],
        );
      }

      // Insertar correos electrónicos
      for (const correo of Correos) {
        await connection.query(
          `INSERT INTO CorreosElectronicosUsuario (UsuarioID_Ref, CorreoElectronico, EsPrincipal, Verificado)
           VALUES (?, ?, ?, ?)`,
          [
            UsuarioID,
            correo.CorreoElectronico,
            correo.EsPrincipal ?? false,
            false,
          ],
        );
      }

      await connection.commit();
      return { message: 'Usuario creado correctamente', UsuarioID };
    } catch (error: unknown) {
      await connection.rollback();
      if (error instanceof Error) {
        console.error('Error al crear usuario:', error.message);
        return { message: 'Error al crear usuario', error: error.message };
      }
      return { message: 'Error desconocido al crear usuario' };
    } finally {
      connection.release();
    }
  }
}
