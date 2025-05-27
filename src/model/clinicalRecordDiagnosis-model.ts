import { DiagnosisType } from '../entity/clinicalRecordDiagnosis';

export interface clinicalRecordDiagnosisModel {
  recordEntryId: number;
  diagnosisCode: string;
  diagnosisType: DiagnosisType;
}
