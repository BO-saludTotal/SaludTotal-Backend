import { SlotStatus } from 'src/entity/availabilitySlot';
export interface availabilitySlotModel {
  id: number;
  doctorUserId: string;
  healthEntityId: number;
  attentionSpaceId: number;
  startDateTime: Date;
  endDateTime: Date;
  offeredAttentionTypeId?: number | null;
  status: SlotStatus;
}
