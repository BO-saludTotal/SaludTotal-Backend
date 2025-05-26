import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { GeneralMedication } from './generalMedication';

@Entity({ name: 'PresentacionesComercialesMedicamentos' })
export class CommercialMedicationPresentation {
  @PrimaryGeneratedColumn({
    name: 'PresentacionMedicamentoID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'MedicamentoGeneralID_Ref',
    type: 'int',
    nullable: false,
  })
  generalMedicationId: number;

  @Column({
    name: 'NombreComercial',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @Index('IDX_NombreComercial')
  brandName: string;

  @Column({
    name: 'LaboratorioFabricante',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  manufacturer: string | null;

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

  @ManyToOne(() => GeneralMedication, (med) => med.commercialPresentations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicamentoGeneralID_Ref' })
  generalMedication: GeneralMedication;
}
