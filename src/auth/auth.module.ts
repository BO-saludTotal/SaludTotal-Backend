
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './JwtStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { DoctorHealthEntityAffiliation } from 'src/entity/doctorHealthEntityAffiliation';
import { GovernmentStaffDetail } from 'src/entity/governmentStaffDetail';
import { AdministrativeStaffDetail } from 'src/entity/administrativeStaffDetail';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      User,
      DoctorHealthEntityAffiliation,
      GovernmentStaffDetail,
      AdministrativeStaffDetail,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error(
            'JWT_SECRET no está definido en las variables de entorno',
          );
        }
        return {
          secret: secret,
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService,TypeOrmModule],
})
export class AuthModule {}
