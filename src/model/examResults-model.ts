export interface examResultsModel {
  id: number;
  clinicalRecordEntryId: number;
  generalExamName: string;
  resultIssueDate?: Date | null;
}
