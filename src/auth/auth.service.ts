import { Injectable } from '@nestjs/common';
import { pool } from '../db';
import { FieldPacket } from 'mysql2';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interface';
import { User } from 'src/entity/usuarios' 

@Injectable()
export class AuthService {
  async login(credentials: LoginDto): Promise<LoginResponse> {
    try {
      const { NombreUsuario, Contrasena } = credentials;

      const result = await pool.query(
        'SELECT * FROM Usuarios WHERE NombreUsuario = ?',
        [NombreUsuario],
      );

      const [rows] = result as unknown as [User [], FieldPacket[]]; 
      const Usuarios = rows[0];

      if (!Usuarios) {
        return { success: false, message: 'User no encontrado' };
      }

      if (Usuarios.contrasenaHash !== Contrasena) {
        return { success: false, message: 'Contraseña incorrecta' };
      }

      return {
        accessToken: 'nada de momento xd',
        success: true,
        message: `Bienvenido`,
        usuario: {
          id: Usuarios.id,
          username: Usuarios.nombreUsuario,
          fullName: Usuarios.nombreCompleto,
          createdAt: Usuarios.fechaRegistro,
          accountStatus: Usuarios.estadoCuenta,
          lastAccess: Usuarios.ultimoAcceso,
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