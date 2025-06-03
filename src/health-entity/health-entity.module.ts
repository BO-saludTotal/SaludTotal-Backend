import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthEntity } from '../entity/healthEntity'; 
import { HealthEntityController } from './health-entity.controller';
import { HealthEntityService } from './health-entity.service';
import { AuthModule } from '../auth/auth.module'; // Para proteger endpoints

@Module({
  imports: [TypeOrmModule.forFeature([HealthEntity]), AuthModule],
  controllers: [HealthEntityController],
  providers: [HealthEntityService],
})
export class HealthEntityModule {}