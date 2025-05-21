export class PacientesDetalles {
  PacienteUsuarioID_Ref: number;
  FechaNacimiento?: Date;
  Genero?: 'Masculino' | 'Femenino' | 'Otro' | 'PrefieroNoDecir';
  DireccionResidencia?: string;
  NombresCompletosPadresOTutores?: string;
}
