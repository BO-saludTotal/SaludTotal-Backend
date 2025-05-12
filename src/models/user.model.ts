export interface Usuario {
  UsuarioID?: number;
  NombreCompleto: string;
  TipoUsuario: 'Paciente' | 'Médico' | 'Administrativo' | 'Gubernamental';
  CredencialAcceso: string;
  ContrasenaHash: string;
  NumeroTelefonico?: string;
  CorreoElectronicoAlternativo?: string;
  EstadoCuenta?: 'Activo' | 'Bloqueado' | 'PendienteVerificacion';
  UltimoAcceso?: string;

  DatosPaciente_InfoDemografica?: any;
  DatosMedico_InfoProfesional?: any;
  DatosAdmin_InfoRol?: any;
  DatosGobierno_InfoEntidad?: any;
}



