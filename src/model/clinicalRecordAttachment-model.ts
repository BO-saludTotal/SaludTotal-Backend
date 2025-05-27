export interface clinicalRecordAttachmentModel {
  id: number;
  recordEntryId: number;
  originalFilename: string | null;
  mimeType: string | null;
  storagePath: string;
  createdAt: Date;
}
