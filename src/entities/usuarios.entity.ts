export class Usuarios {
  UsuarioID: string;
  NombreUsuario: string;
  ContrasenaHash: string;
  NombreCompleto: string;
  FechaRegistro: Date;
  EstadoCuenta: 'Activo' | 'Inactivo' | 'Bloqueado' | 'PendienteVerificacion';
  UltimoAcceso?: Date;
}
