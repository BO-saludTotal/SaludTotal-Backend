import { SpaceType } from 'src/entity/physicalAttentionSpace';

export interface PhysicalAttentionSpaceModel {
  id: number;
  healthEntityId: number;
  name: string;
  spaceType: SpaceType;
  createdAt: Date;
  updatedAt: Date;
}
