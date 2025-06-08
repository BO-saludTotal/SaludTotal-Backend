import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalEventType } from '../entity/medicalEventType'; // Ajusta la ruta a tu carpeta entity
import { MedicalEventTypeController } from './medical-event-type.controller'; // Importa el controlador
import { MedicalEventTypeService } from './medical-event-type.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule, // Para que los guards estén disponibles
    TypeOrmModule.forFeature([MedicalEventType])
  ],
  controllers: [MedicalEventTypeController], // <--- ASEGÚRATE QUE EL CONTROLADOR ESTÉ AQUÍ
  providers: [MedicalEventTypeService],
  exports: [MedicalEventTypeService] // Si otros módulos necesitan este servicio
})
export class MedicalEventTypeModule {}