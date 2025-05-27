export interface commercialMedicationPresentationModel {
  id: number;
  generalMedicationId: number;
  commercialName: string;
  manufacturerLaboratory?: string | null;
}
