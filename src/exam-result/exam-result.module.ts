import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResultService } from './exam-result.service';
import { ExamResultController } from './exam-result.controller';
import { ExamResult } from '../entity/examResult';
import { ExamResultDetail } from '../entity/examResultDetail';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { ExamParameter } from '../entity/examParameter';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ExamResult,
      ExamResultDetail,
      ClinicalRecordEntry,
      ExamParameter,
    ]),
  ],
  controllers: [ExamResultController],
  providers: [ExamResultService],
  exports: [ExamResultService] 
})
export class ExamResultModule {}