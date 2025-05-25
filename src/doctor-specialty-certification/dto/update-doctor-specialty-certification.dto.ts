import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorSpecialtyCertificationDto } from './create-doctor-specialty-certification.dto';

export class UpdateDoctorSpecialtyCertificationDto extends PartialType(CreateDoctorSpecialtyCertificationDto) {}
