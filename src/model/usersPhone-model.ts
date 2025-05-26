<<<<<<< HEAD
import { TipoTelefonoType } from 'src/entity/telefonosUsuario';
=======
import { TipoTelefonoType } from 'src/entity/users-Phone';
>>>>>>> dfd941c5043417f3eb1b4c5e093c955a87c5d6c4
export interface userPhoneModel {
  usuarioId: number;
  numeroTelefono: string;
  tipoTelefono?: TipoTelefonoType;
  esPrincipal: boolean;
  fechaCreacion: Date;
}
