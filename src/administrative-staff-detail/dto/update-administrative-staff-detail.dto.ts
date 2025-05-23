import { PartialType } from '@nestjs/mapped-types';
import { CreateAdministrativeStaffDetailDto } from './create-administrative-staff-detail.dto';

export class UpdateAdministrativeStaffDetailDto extends PartialType(CreateAdministrativeStaffDetailDto) {}
