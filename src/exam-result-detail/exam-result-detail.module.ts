import { Module } from '@nestjs/common';
import { ExamResultDetailService } from './exam-result-detail.service';
import { ExamResultDetailController } from './exam-result-detail.controller';

@Module({
  controllers: [ExamResultDetailController],
  providers: [ExamResultDetailService],
})
export class ExamResultDetailModule {}
