export interface LoginResponse {
  accessToken?: string;
  success: boolean;
  message: string;
  usuario?: {
    id: number;
    nombre: string;
    nombreCompleto: string;
    registro: Date;
    estado: 'Activo' | 'Inactivo' | 'Bloqueado' | 'PendienteVerificacion';
    ultimoAcceso?: Date;
  };
}
