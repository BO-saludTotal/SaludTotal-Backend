export interface appointmentChangeHistoryModel {
  id: number;
  appointmentId: number;
  changeDateTime: Date;
  changedByUserId: string | null;
  previousStatus: string | null;
  newStatus: string | null;
  reasonForChangeOrCancellation?: string | null;
}
