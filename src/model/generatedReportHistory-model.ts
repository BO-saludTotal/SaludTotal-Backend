export interface generatedReportHistoryModel {
  id: number;
  reportTypeId: number;
  requestingUserId?: string | null;
  generatedAt: Date;
  parametersUsed?: any;
  storageLink: string | null;
}
