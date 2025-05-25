import { Module } from '@nestjs/common';
import { ExamParameterService } from './exam-parameter.service';
import { ExamParameterController } from './exam-parameter.controller';

@Module({
  controllers: [ExamParameterController],
  providers: [ExamParameterService],
})
export class ExamParameterModule {}
