export class EntidadesSalud {
  EntidadSaludID: number;
  NombreOficial: string;
  TipoEntidad:
    | 'Hospital'
    | 'Clínica'
    | 'Consultorio'
    | 'Laboratorio'
    | 'Centro Diagnóstico';
  DireccionCompleta?: string;
}
