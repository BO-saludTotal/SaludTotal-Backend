export class Usuarios {
  UsuarioID: number;
  NombreUsuario: string;
  ContrasenaHash: string;
  NombreCompleto: string;
  FechaRegistro: Date;
  EstadoCuenta: 'Activo' | 'Inactivo' | 'Bloqueado' | 'PendienteVerificacion';
  UltimoAcceso?: Date;
}
