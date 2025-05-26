import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { SystemAuditLog } from './systemAuditLog';

export type SeverityLevel = 'Bajo' | 'Medio' | 'Alto' | 'Crítico';

@Entity({ name: 'TiposAccionAuditoriaCatalogo' })
export class AuditActionType extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'TipoAccionID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'NombreTipoAccion',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  @Index('IDX_NombreTipoAccion', { unique: true })
  name: string;

  @Column({
    name: 'NivelSeveridad',
    type: 'enum',
    enum: ['Bajo', 'Medio', 'Alto', 'Crítico'],
    nullable: true,
  })
  severityLevel: SeverityLevel | null;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'FechaActualizacion',
    type: 'timestamp',
  })
  updatedAt: Date;

  @OneToMany(() => SystemAuditLog, (log) => log.actionType)
  auditLogs: SystemAuditLog[];
}
