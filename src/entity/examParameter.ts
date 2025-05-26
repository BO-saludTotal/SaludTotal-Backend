import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExamResultDetail } from './examResultDetail';
import { ClinicalRecordEntry } from './clinicalRecordEntry';
import { PrescriptionMedicationDetail } from './prescriptionMedicationDetail';

@Entity({ name: 'ParametrosExamenCatalogo' })
export class ExamParameter extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'ParametroExamenID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'NombreParametro',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  @Index('IDX_NombreParametro', { unique: true })
  name: string;

  @Column({
    name: 'UnidadMedidaDefault',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  defaultUnit: string | null;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany(() => ExamResultDetail, (detail) => detail.parameter)
  examResults: ExamResultDetail[];

  @ManyToOne(() => ClinicalRecordEntry, (entry) => entry.examParametes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EntradaHistorialID_Ref' })
  recordEntry: ClinicalRecordEntry;

  @OneToMany(
    () => PrescriptionMedicationDetail,
    (prescriptions) => prescriptions.results,
  )
  prescriptions: PrescriptionMedicationDetail[];
}
