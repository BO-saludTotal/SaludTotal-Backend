import { PartialType } from '@nestjs/mapped-types';
import { CreateExamResultDetailDto } from './create-exam-result-detail.dto';

export class UpdateExamResultDetailDto extends PartialType(CreateExamResultDetailDto) {}
