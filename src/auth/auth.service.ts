import { Injectable } from '@nestjs/common';
import { pool } from '../db';
import { FieldPacket } from 'mysql2';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interface';
import { User } from 'src/entity/user';

@Injectable()
export class AuthService {
  async login(credentials: LoginDto): Promise<LoginResponse> {
    try {
      const { username, passwordHash } = credentials;

      const result = await pool.query(
        'SELECT * FROM Usuarios WHERE NombreUsuario = ?',
        [username],
      );

      const [rows] = result as unknown as [User[], FieldPacket[]];
      const user = rows[0];

      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      if (user.passwordHash !== passwordHash) {
        return { success: false, message: 'Contraseña incorrecta' };
      }

      return {
        accessToken: 'nada de momento xd',
        success: true,
        message: `Bienvenido`,
        user: {
          id: user.id,
          username: user.username,
          passwordHash: user.passwordHash,
          fullName: user.fullName,
          registrationDate: user.registrationDate,
          accountStatus: user.accountStatus,
          lastAccess: user.lastAccess,
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