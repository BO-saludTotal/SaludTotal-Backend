export interface ScheduleBlockExceptionModel {
  id: number;
  doctorUserId: string;
  startDateTime: Date;
  endDateTime: Date;
  reason?: string | null;
}
