import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneratedReportHistoryDto } from './create-generated-report-history.dto';

export class UpdateGeneratedReportHistoryDto extends PartialType(CreateGeneratedReportHistoryDto) {}
