import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorHealthEntityAffiliationDto } from './create-doctor-health-entity-affiliation.dto';

export class UpdateDoctorHealthEntityAffiliationDto extends PartialType(CreateDoctorHealthEntityAffiliationDto) {}
