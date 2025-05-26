import { TipoTelefonoType } from 'src/entity/telefonosUsuario';
export interface userPhoneModel {
  usuarioId: number;
  numeroTelefono: string;
  tipoTelefono?: TipoTelefonoType;
  esPrincipal: boolean;
  fechaCreacion: Date;
}
