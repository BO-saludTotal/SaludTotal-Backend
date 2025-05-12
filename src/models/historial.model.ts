export interface EntradaHistorial {
  EntradaHistorialID?: number;
  PacienteID_Ref: number;
  MedicoID_Atendio_Ref?: number;
  HospitalID_Atencion_Ref?: number;
  CitaID_Relacionada_Ref?: number;
  FechaHoraAtencion: string;
  TipoEventoMedico: string;
  DiagnosticoPrincipal?: string;
  DiagnosticosSecundarios?: string;
  ProcedimientosRealizados?: string;
  ResultadosExamenes?: any;
  EnlaceDocumentosAdjuntos?: any;
  RecetaMedicaElectronica_Detalle?: any;
  NotasMedico?: string;
}
