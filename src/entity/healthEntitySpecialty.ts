import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { HealthEntity } from './healthEntity';
import { MedicalSpecialty } from './medicalSpecialty';

@Entity({ name: 'EntidadSaludOfreceEspecialidades' })
export class HealthEntitySpecialty extends BaseEntity {
  @PrimaryColumn({ name: 'EntidadSaludID_Ref', type: 'int' })
  healthEntityId: number;

  @PrimaryColumn({ name: 'EspecialidadID_Ref', type: 'int' })
  specialtyId: number;

  @ManyToOne(
    () => HealthEntity,
    (healthEntity) => healthEntity.offeredSpecialties,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'EntidadSaludID_Ref', referencedColumnName: 'id' })
  healthEntity: HealthEntity;

  @ManyToOne(
    () => MedicalSpecialty,
    (specialty) => specialty.healthEntityOfferings,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'EspecialidadID_Ref', referencedColumnName: 'id' })
  specialty: MedicalSpecialty;
}
