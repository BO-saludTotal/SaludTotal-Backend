import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDetailDto } from './create-doctor-detail.dto';

export class UpdateDoctorDetailDto extends PartialType(CreateDoctorDetailDto) {}
