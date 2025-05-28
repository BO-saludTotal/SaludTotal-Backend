import { SeverityLevel } from 'src/entity/auditActionType';
export interface auditActinTypeModel {
  id: number;
  actionTypeName: string;
  severityLevel: SeverityLevel | null;
}
