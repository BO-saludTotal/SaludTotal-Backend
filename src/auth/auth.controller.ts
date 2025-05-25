import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<LoginResponse> {
    try {
      const result = await this.authService.login(credentials);
      return result;
    } catch (error: unknown) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : 'Credenciales inválidas';

      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
