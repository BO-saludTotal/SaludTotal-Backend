import { HealthEntityType } from '../entity/healthEntity';
export interface healthEntityModel {
  id: number;
  officialName: string;
  entityType: HealthEntityType;
  fullAddress: string | null;
  createdAt: Date;
}
