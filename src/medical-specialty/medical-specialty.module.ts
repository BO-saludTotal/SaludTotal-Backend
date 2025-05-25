import { Module } from '@nestjs/common';
import { MedicalSpecialtyService } from './medical-specialty.service';
import { MedicalSpecialtyController } from './medical-specialty.controller';

@Module({
  controllers: [MedicalSpecialtyController],
  providers: [MedicalSpecialtyService],
})
export class MedicalSpecialtyModule {}
