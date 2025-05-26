import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ExamResult } from './examResult';
import { ExamParameter } from './examParameter';
import { Prescription } from './prescription';

@Entity({ name: 'PrescripcionDetalleMedicamentos' })
export class PrescriptionMedicationDetail {
  @PrimaryGeneratedColumn({
    name: 'PrescripcionDetalleID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'PrescripcionID_Ref',
    type: 'int',
    nullable: false,
  })
  prescriptionId: number;

  @Column({
    name: 'PresentacionMedicamentoID_Ref',
    type: 'int',
    nullable: false,
  })
  medicationId: number;

  @Column({
    name: 'DosisIndicada',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  dosage: string | null;

  @Column({
    name: 'FrecuenciaIndicada',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  frequency: string | null;

  @Column({
    name: 'DuracionTratamientoIndicada',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  duration: string | null;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => ExamResult, (result) => result.medications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PrescripcionID_Ref' })
  results: ExamResult;

  @ManyToOne(() => ExamParameter, (parameter) => parameter.prescriptions, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PresentacionMedicamentoID_Ref' })
  parameter: ExamParameter;

  @ManyToOne(() => Prescription, (prescription) => prescription.medications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PrescripcionID_Ref' })
  prescription: Prescription;
}
