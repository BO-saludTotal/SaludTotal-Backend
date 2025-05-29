import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

export interface JwtAuthPayload {
  sub: string;
  username: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error(
        'FATAL ERROR: JWT_SECRET no está definido en las variables de entorno.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: false,
    });
  }

  // Este método validate NO espera 'request' como primer argumento
  async validate(payload: JwtAuthPayload): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: {
        assignedRoles: {
          role: true,
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Token inválido: Usuario no encontrado.');
    }

    return { userId: user.id, username: user.username, roles: payload.roles };
  }
}
