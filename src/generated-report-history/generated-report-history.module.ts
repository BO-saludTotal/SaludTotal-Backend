import { Module } from '@nestjs/common';
import { GeneratedReportHistoryService } from './generated-report-history.service';
import { GeneratedReportHistoryController } from './generated-report-history.controller';

@Module({
  controllers: [GeneratedReportHistoryController],
  providers: [GeneratedReportHistoryService],
})
export class GeneratedReportHistoryModule {}
