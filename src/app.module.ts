import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { DoctorDetailModule } from './doctor-detail/doctor-detail.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), MedicalAppointmentModule, DoctorDetailModule],
  controllers: [AuthController, UsuariosController],
  providers: [AuthService, UsuariosService],
})
export class AppModule {}

