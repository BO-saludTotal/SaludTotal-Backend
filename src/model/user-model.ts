import { EstadoCuentaType } from 'src/entity/user';
export interface userModel {
  id: string;
  nombreUsuario: string;
  contrasenaHash: string;
  nombreCompleto: string;
  fechaRegistro: Date;
  estadoCuenta: EstadoCuentaType;
  ultimoAcceso: Date | null;
}
