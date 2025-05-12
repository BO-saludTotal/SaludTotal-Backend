export interface CitaMedica {
  CitaID?: number;
  PacienteID_Ref?: number;
  MedicoID_Ref?: number;
  HospitalID_Ref?: number;
  FechaHoraCita: string;
  EstadoCita?: string;
  NotasPaciente?: string;
  ConfirmacionAsistenciaPaciente?: boolean;
}
