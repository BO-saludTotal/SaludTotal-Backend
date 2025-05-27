import { AppointmentStatusType } from 'src/entity/medicalAppointment';
export interface medicalAppointmentModel {
  id: number;
  slotId: number;
  patientUserId: string;
  requestDateTime: Date;
  status: AppointmentStatusType;
  patientReason?: string | null;
}
