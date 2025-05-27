export interface prescriptionMedicationDetailModel {
  id: number;
  prescriptionId: number;
  medicationPresentationId: number;
  indicatedDose?: string | null;
  indicatedFrequency?: string | null;
  indicatedTreatmentDuration?: string | null;
}
