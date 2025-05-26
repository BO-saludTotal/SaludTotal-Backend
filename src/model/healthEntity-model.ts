import { HealthEntityType } from '../entity/entidadesSalud';
export interface healthEntityModel {
  id: number;
  officialName: string;
  entityType: HealthEntityType;
  fullAddress: string | null;
  createdAt: Date;
}
