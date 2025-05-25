import { Module } from '@nestjs/common';
import { DiagnosisCodeService } from './diagnosis-code.service';
import { DiagnosisCodeController } from './diagnosis-code.controller';

@Module({
  controllers: [DiagnosisCodeController],
  providers: [DiagnosisCodeService],
})
export class DiagnosisCodeModule {}
