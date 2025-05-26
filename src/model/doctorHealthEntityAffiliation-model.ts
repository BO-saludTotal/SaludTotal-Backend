export interface DoctorHealthEntityAffiliationModel {
  doctorUserId: number;
  healthEntityId: number;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
