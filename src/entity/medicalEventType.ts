import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { ClinicalRecordEntry } from './clinicalRecordEntry';

@Entity({ name: 'TiposEventoMedicoCatalogo' })
export class MedicalEventType extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'TipoEventoMedicoID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'NombreTipoEvento',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  @Index('IDX_NombreTipoEvento', { unique: true })
  name: string;

  @Column({
    name: 'DescripcionTipoEvento',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'FechaActualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => ClinicalRecordEntry, (record) => record.eventType)
  clinicalRecords: ClinicalRecordEntry[];
}
