import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ClinicalRecordEntry } from './clinicalRecordEntry';
import { ExamResultDetail } from './examResultDetail';

@Entity({ name: 'EntradaHistorialResultadosExamenes' })
export class ExamResult extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ResultadoExamenID', type: 'int' })
  id: number;

  @Column({ name: 'EntradaHistorialID_Ref', type: 'int', nullable: false })
  clinicalRecordEntryId: number;

  @Column({
    name: 'NombreExamenGeneral',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  generalExamName: string;

  @Column({ name: 'FechaEmisionResultado', type: 'datetime', nullable: true })
  resultIssueDate?: Date | null;

  @ManyToOne(() => ClinicalRecordEntry, (entry) => entry.examResults, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EntradaHistorialID_Ref' })
  clinicalRecordEntry: ClinicalRecordEntry;

  @OneToMany(() => ExamResultDetail, (detail) => detail.examResult)
  parameterDetails: ExamResultDetail[];
}
