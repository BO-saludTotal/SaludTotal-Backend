import { AccountStatusType } from 'src/entity/user';
export interface LoginResponse {
  accessToken?: string;
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    passwordHash: string;
    fullName: string;
    registrationDate: Date;
    accountStatus: AccountStatusType;
    lastAccess?: Date | null;
  };
}
