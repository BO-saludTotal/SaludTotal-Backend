export class TelefonoUsuario {
  UsuarioID_Ref: number;
  NumeroTelefono: string;
  TipoTelefono?: 'Móvil' | 'Casa' | 'Trabajo';
  EsPrincipal: boolean;
}
