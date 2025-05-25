export class CrearUsuarioDto {
  NombreUsuario: string;
  Contrasena: string;
  NombreCompleto: string;
  RolID?: number;

  Telefonos?: {
    NumeroTelefono: string;
    TipoTelefono?: 'Móvil' | 'Casa' | 'Trabajo';
    EsPrincipal?: boolean;
  }[];

  Correos?: {
    CorreoElectronico: string;
    EsPrincipal?: boolean;
  }[];
}
