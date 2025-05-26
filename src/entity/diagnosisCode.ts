import {
  Entity,
  PrimaryColumn,
  Column,
  //Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { ClinicalRecordDiagnosis } from './clinicalRecordDiagnosis';

@Entity({ name: 'DiagnosticosCIE_Catalogo' })
export class DiagnosisCode extends BaseEntity {
  @PrimaryColumn({
    name: 'CodigoCIE',
    type: 'varchar',
    length: 10,
  })
  code: string;

  @Column({
    name: 'DescripcionCIE',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'VersionCIE',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  version: string;

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

  @OneToMany(() => ClinicalRecordDiagnosis, (diagnosis) => diagnosis.diagnosis)
  clinicalRecords: ClinicalRecordDiagnosis[];
}
