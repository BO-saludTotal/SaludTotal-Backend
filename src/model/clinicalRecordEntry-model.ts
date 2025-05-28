export interface ClinicalRecordEntryModel {
  id: number;
  patientUserId: string;
  doctorUserId: string;
  healthEntityId: number;
  spaceId: number | null;
  appointmentId: number | null;
  eventTypeId: number;
  attentionStartDateTime: Date;
  narrativeSummary: string | null;
  createdAt: Date;
  updatedAt: Date;
}
