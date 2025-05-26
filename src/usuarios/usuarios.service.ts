import { Injectable } from '@nestjs/common';
import { pool } from '../db'; // Asumo que tienes una forma de obtener el pool de mysql2
import { CrearUsuarioDto } from './dto/crear-usuario.dto'; // Asumo que esto es un DTO
import { ResultSetHeader } from 'mysql2';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class UsuariosService {
  async crearUsuario(dto: CrearUsuarioDto) {
    const {
      NombreUsuario,
      Contrasena, // ¡Asegúrate de que esta ya esté HASHEADA antes de llegar aquí!
      NombreCompleto,
      RolID,
      Telefonos = [],
      Correos = [],
    } = dto;

    const UsuarioID_UUID = uuidv4();

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {

      await connection.query( 
        `INSERT INTO Usuarios (UsuarioID, NombreUsuario, ContrasenaHash, NombreCompleto) 
         VALUES (?, ?, ?, ?)`, // Añade UsuarioID al INSERT
        [UsuarioID_UUID, NombreUsuario, Contrasena, NombreCompleto], // Pasa el UUID
      );

      // const UsuarioID = usuarioResult.insertId; // YA NO NECESITAS ESTO

      // Insertar en UsuarioRolesAsignados
      await connection.query(
        `INSERT INTO UsuarioRolesAsignados (UsuarioID_Ref, RolID_Ref)
         VALUES (?, ?)`,
        [UsuarioID_UUID, RolID], // Usa el UUID generado
      );

      // Insertar teléfonos
      for (const telefono of Telefonos) {
        await connection.query(
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


      for (const correo of Correos) {
        await connection.query(
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

      await connection.commit();
      return { message: 'Usuario creado correctamente', UsuarioID: UsuarioID_UUID }; // Devuelve el UUID
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