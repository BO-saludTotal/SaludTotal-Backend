import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { SystemAuditLog } from './systemAuditLog';

export type SeverityLevel = 'Bajo' | 'Medio' | 'Alto' | 'Crítico';

@Entity({ name: 'TiposAccionAuditoriaCatalogo' })
export class AuditActionType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'TipoAccionID', type: 'int' })
  id: number;

  @Column({
    name: 'NombreTipoAccion',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  actionTypeName: string;

  @Column({
    name: 'NivelSeveridad',
    type: 'enum',
    enum: ['Bajo', 'Medio', 'Alto', 'Crítico'],
    nullable: true,
  })
  severityLevel?: SeverityLevel | null;

  @OneToMany(() => SystemAuditLog, (log) => log.actionType)
  auditLogs: SystemAuditLog[];
}
