export interface Hospital {
  HospitalID?: number;
  NombreOficial: string;
  TipoCentro?: string;
  DireccionCompleta?: string;
  TelefonosContacto?: any;
  CorreoElectronicoContacto?: string;
  HorarioAtencionGeneral?: string;
  ServiciosEspecialidadesOfrecidas?: any;
  ListaMedicosAsociadosConHorarios?: any;
  CapacidadCamas?: number;
  EquipamientoDestacado?: string;
}
