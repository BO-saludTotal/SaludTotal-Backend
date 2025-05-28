import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Prescription } from './prescription';
import { CommercialMedicationPresentation } from './commercialMedicationPresentation';

@Entity({ name: 'PrescripcionDetalleMedicamentos' })
export class PrescriptionMedicationDetail extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'PrescripcionDetalleID', type: 'int' })
  id: number;

  @Column({ name: 'PrescripcionID_Ref', type: 'int', nullable: false })
  prescriptionId: number;

  @Column({
    name: 'PresentacionMedicamentoID_Ref',
    type: 'int',
    nullable: false,
  })
  medicationPresentationId: number;

  @Column({
    name: 'DosisIndicada',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  indicatedDose?: string | null;

  @Column({
    name: 'FrecuenciaIndicada',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  indicatedFrequency?: string | null;

  @Column({
    name: 'DuracionTratamientoIndicada',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  indicatedTreatmentDuration?: string | null;

  @ManyToOne(() => Prescription, (p) => p.medicationDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PrescripcionID_Ref', referencedColumnName: 'id' })
  prescription: Prescription;

  @ManyToOne(
    () => CommercialMedicationPresentation,
    (cmp) => cmp.prescriptionDetails,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn({
    name: 'PresentacionMedicamentoID_Ref',
    referencedColumnName: 'id',
  })
  medicationPresentation: CommercialMedicationPresentation;
}
