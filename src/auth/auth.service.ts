import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/entity/user';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, passwordHash: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(passwordHash, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    return user;
  }
  async loginUser(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(
      loginDto.username,
      loginDto.passwordHash,
    );
    const payload = {
      id: user.id,
      accountStatus: user.accountStatus,
      assignedRoles: user.assignedRoles,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      success: true,
      message: 'Login correcto',
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
  }
}
