import { AccountStatusType } from "src/entity/user";
export interface userModel {
  id: number;
  nombreUsuario: string;
  contrasenaHash: string;
  nombreCompleto: string;
  fechaRegistro: Date;
  estadoCuenta: AccountStatusType;
  ultimoAcceso: Date | null;
}
