import { Module } from '@nestjs/common';
import { ReportTypeService } from './report-type.service';
import { ReportTypeController } from './report-type.controller';

@Module({
  controllers: [ReportTypeController],
  providers: [ReportTypeService],
})
export class ReportTypeModule {}
