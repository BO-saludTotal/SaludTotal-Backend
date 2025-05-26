export class TelefonoUsuario {
  UsuarioID_Ref: string;
  NumeroTelefono: string;
  TipoTelefono?: 'Móvil' | 'Casa' | 'Trabajo';
  EsPrincipal: boolean;
}
