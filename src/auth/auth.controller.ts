
import {
  Controller,
  Get, 
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards, 
  Req,       
} from '@nestjs/common';
import { AuthService, LoginResponsePayload } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express'; 

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    username: string;
    roles: string[];
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginDto: LoginDto): Promise<LoginResponsePayload> {
    return this.authService.login(loginDto);
  }


  @Get('profile')
  @UseGuards(JwtAuthGuard) 
  getProfile(@Req() req: AuthenticatedRequest) {

    return req.user;
  }


  // Aquí también podrías tener el endpoint de registro si lo maneja AuthController
  // @Post('register')

}