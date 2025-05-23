import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';

@Module({
  imports: [],
  controllers: [AuthController, UsuariosController],
  providers: [AuthService, UsuariosService],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),MedicalAppointmentModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 185aefe (api)
})
export class AppModule {}
