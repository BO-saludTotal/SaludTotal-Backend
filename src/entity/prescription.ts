import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { ClinicalRecordEntry } from './clinicalRecordEntry';
import { PrescriptionMedicationDetail } from './prescriptionMedicationDetail';

@Entity({ name: 'EntradaHistorialPrescripciones' })
export class Prescription extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'PrescripcionID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'EntradaHistorialID_Ref',
    type: 'int',
    nullable: false,
  })
  recordEntryId: number;

  @Column({
    name: 'FechaPrescripcion',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  prescriptionDate: Date;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => ClinicalRecordEntry, (entry) => entry.prescriptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EntradaHistorialID_Ref' })
  recordEntry: ClinicalRecordEntry;

  @OneToMany(
    () => PrescriptionMedicationDetail,
    (detail) => detail.prescription,
  )
  medications: PrescriptionMedicationDetail[];
}
