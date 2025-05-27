import { DayOfWeek } from 'src/entity/doctorScheduleTemplate';
export interface doctorScheduleTemplateModel {
  id: number;
  doctorUserId: string;
  healthEntityId: number;
  attentionSpaceId?: number | null;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  validFrom: Date;
  validUntil?: Date | null;
}
