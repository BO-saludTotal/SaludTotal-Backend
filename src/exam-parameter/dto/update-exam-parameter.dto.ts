import { PartialType } from '@nestjs/mapped-types';
import { CreateExamParameterDto } from './create-exam-parameter.dto';

export class UpdateExamParameterDto extends PartialType(CreateExamParameterDto) {}
