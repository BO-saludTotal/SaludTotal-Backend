import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './user';
import { HealthEntity } from './healthEntity';

@Entity({ name: 'PersonalAdministrativoDetalles' })
export class AdministrativeStaffDetail extends BaseEntity {
  @PrimaryColumn({ name: 'AdminUsuarioID_Ref', type: 'varchar', length: 36 })
  adminUserId: string;

  @Column({
    name: 'CargoAdministrativo',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  administrativePosition?: string | null;

  @Column({ name: 'EntidadSaludID_Asignada_Ref', type: 'int', nullable: true })
  assignedHealthEntityId?: number | null;

  @OneToOne(() => User, (user) => user.administrativeStaffDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'AdminUsuarioID_Ref', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(
    () => HealthEntity,
    (healthEntity) => healthEntity.administrativeStaff,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({
    name: 'EntidadSaludID_Asignada_Ref',
    referencedColumnName: 'id',
  })
  assignedHealthEntity?: HealthEntity | null;
}
