import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';

@Module({
  imports: [],
  controllers: [AuthController, UsuariosController],
  providers: [AuthService, UsuariosService],
})
export class AppModule {}
