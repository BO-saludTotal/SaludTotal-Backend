import { PhoneType } from "src/entity/userPhone";
export interface userPhoneModel {
  usuarioId: string;
  numeroTelefono: string;
  tipoTelefono?: PhoneType;
  esPrincipal: boolean;
  fechaCreacion: Date;
}
