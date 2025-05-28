import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { GeneralMedication } from './generalMedication';
import { PrescriptionMedicationDetail } from './prescriptionMedicationDetail';

@Entity({ name: 'PresentacionesComercialesMedicamentos' })
export class CommercialMedicationPresentation extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'PresentacionMedicamentoID', type: 'int' })
  id: number;

  @Column({ name: 'MedicamentoGeneralID_Ref', type: 'int', nullable: false })
  generalMedicationId: number;

  @Column({
    name: 'NombreComercial',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  commercialName: string;

  @Column({
    name: 'LaboratorioFabricante',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  manufacturerLaboratory?: string | null;

  @ManyToOne(() => GeneralMedication, (gm) => gm.commercialPresentations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicamentoGeneralID_Ref', referencedColumnName: 'id' })
  generalMedication: GeneralMedication;

  @OneToMany(
    () => PrescriptionMedicationDetail,
    (detail) => detail.medicationPresentation,
  )
  prescriptionDetails: PrescriptionMedicationDetail[];
}
