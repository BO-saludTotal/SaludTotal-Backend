import { Injectable } from '@nestjs/common';
import { pool } from '../db';
import { FieldPacket } from 'mysql2';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interface';
import { Usuarios } from 'src/entities/usuarios.entity';

@Injectable()
export class AuthService {
  async login(credentials: LoginDto): Promise<LoginResponse> {
    try {
      const { NombreUsuario, Contrasena } = credentials;

      const result = await pool.query(
        'SELECT * FROM Usuarios WHERE NombreUsuario = ?',
        [NombreUsuario],
      );

      const [rows] = result as unknown as [Usuarios[], FieldPacket[]];
      const Usuarios = rows[0];

      if (!Usuarios) {
        return { success: false, message: 'User no encontrado' };
      }

      if (Usuarios.ContrasenaHash !== Contrasena) {
        return { success: false, message: 'Contraseña incorrecta' };
      }

      return {
        accessToken: 'nada de momento xd',
        success: true,
        message: `Bienvenido`,
        usuario: {
          id: Usuarios.UsuarioID,
          nombre: Usuarios.NombreUsuario,
          nombreCompleto: Usuarios.NombreCompleto,
          registro: Usuarios.FechaRegistro,
          estado: Usuarios.EstadoCuenta,
          ultimoAcceso: Usuarios.UltimoAcceso,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error en login: ', error);
        return { success: false, message: error.message };
      }
      return { success: false, message: 'Error desconocido en login' };
    }
  }
}