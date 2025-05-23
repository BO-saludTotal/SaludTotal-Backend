import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalAppointmentDto } from './create-medical-appointment.dto';

export class UpdateMedicalAppointmentDto extends PartialType(CreateMedicalAppointmentDto) {}
