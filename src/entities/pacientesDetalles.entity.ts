export class PacientesDetalles {
  PacienteUsuarioID_Ref: string;
  FechaNacimiento?: Date;
  Genero?: 'Masculino' | 'Femenino' | 'Otro' | 'PrefieroNoDecir';
  DireccionResidencia?: string;
  NombresCompletosPadresOTutores?: string;
}
