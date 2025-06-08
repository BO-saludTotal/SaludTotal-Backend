import { PartialType } from '@nestjs/mapped-types';
import { CreateExamResultParameterDto } from './create-exam-parameter.dto';

export class UpdateExamParameterDto extends PartialType(CreateExamResultParameterDto) {}
