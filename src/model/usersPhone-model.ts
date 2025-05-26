import { TipoTelefonoType } from "src/entity/users-Phone";
export interface userPhoneModel {
  usuarioId: string;
  numeroTelefono: string;
  tipoTelefono?: TipoTelefonoType;
  esPrincipal: boolean;
  fechaCreacion: Date;
}
