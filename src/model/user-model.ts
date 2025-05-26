import { EstadoCuentaType } from 'src/entity/usuarios';
export interface userModel {
  id: number;
  nombreUsuario: string;
  contrasenaHash: string;
  nombreCompleto: string;
  fechaRegistro: Date;
  estadoCuenta: EstadoCuentaType;
  ultimoAcceso: Date | null;
}
