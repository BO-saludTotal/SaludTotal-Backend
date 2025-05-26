import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorDetail } from './doctorDetail';
import { HealthEntity } from './healthEntity';

@Entity({ name: 'MedicoEjerceEnEntidadSalud' })
export class DoctorHealthEntityAffiliation {
  @PrimaryColumn({
    name: 'MedicoUsuarioID_Ref',
    type: 'int',
  })
  doctorUserId: number;

  @PrimaryColumn({
    name: 'EntidadSaludID_Ref',
    type: 'int',
  })
  healthEntityId: number;

  @Column({
    name: 'FechaInicioAfiliacion',
    type: 'date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    name: 'FechaFinAfiliacion',
    type: 'date',
    nullable: true,
  })
  endDate: Date | null;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'FechaActualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => DoctorDetail, (doctor) => doctor.healthEntityAffiliations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref' })
  doctor: DoctorDetail;

  @ManyToOne(() => HealthEntity, (entity) => entity.doctorAffiliations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EntidadSaludID_Ref' })
  healthEntity: HealthEntity;
}
