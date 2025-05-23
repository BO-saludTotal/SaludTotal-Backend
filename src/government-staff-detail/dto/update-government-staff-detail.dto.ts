import { PartialType } from '@nestjs/mapped-types';
import { CreateGovernmentStaffDetailDto } from './create-government-staff-detail.dto';

export class UpdateGovernmentStaffDetailDto extends PartialType(CreateGovernmentStaffDetailDto) {}
