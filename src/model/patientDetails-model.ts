import { GenderType } from '../entity/patientDetails';

export interface roleModel {
  patientUserId: number;
  birthDate: Date | null;
  gender: GenderType | null;
  address: string | null;
  parentsOrGuardians: string | null;
}
