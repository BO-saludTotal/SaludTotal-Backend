import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { User } from './user';
import { HealthEntity } from './healthEntity';

@Entity({ name: 'MedicoEjerceEnEntidadSalud' })
export class DoctorHealthEntityAffiliation extends BaseEntity {
  @PrimaryColumn({ name: 'MedicoUsuarioID_Ref', type: 'varchar', length: 36 })
  doctorUserId: string;

  @PrimaryColumn({ name: 'EntidadSaludID_Ref', type: 'int' })
  healthEntityId: number;

  @Column({ name: 'FechaInicioAfiliacion', type: 'date', nullable: false })
  affiliationStartDate: Date;

  @Column({ name: 'FechaFinAfiliacion', type: 'date', nullable: true })
  affiliationEndDate?: Date | null;

  @ManyToOne(() => User, (user) => user.affiliationsAsDoctor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref', referencedColumnName: 'id' })
  doctorUser: User;

  @ManyToOne(
    () => HealthEntity,
    (healthEntity) => healthEntity.doctorAffiliations,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'EntidadSaludID_Ref', referencedColumnName: 'id' })
  healthEntity: HealthEntity;
}
