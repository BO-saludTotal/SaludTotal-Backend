import { ActionResult } from 'src/entity/systemAuditLog';
export interface systemAuditLogModel {
  id: number;
  eventTimestamp: Date;
  actorUserId?: string | null;
  actionTypeId: number;
  detailedEventDescription?: string | null;
  sourceIpAddress?: string | null;
  actionResult?: ActionResult | null;
}
