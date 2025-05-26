import { TipoTelefonoType } from 'src/entity/users-Phone';
export interface userPhoneModel {
  usuarioId: number;
  numeroTelefono: string;
  tipoTelefono?: TipoTelefonoType;
  esPrincipal: boolean;
  fechaCreacion: Date;
}
