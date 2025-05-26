import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'PersonalGubernamentalDetalles' })
export class GovernmentStaffDetail {
  @PrimaryColumn({
    name: 'GobiernoUsuarioID_Ref',
    type: 'int',
  })
  governmentUserId: number;

  @Column({
    name: 'NombreInstitucionGubernamental',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  governmentInstitution: string;

  @Column({
    name: 'CargoEnInstitucion',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  institutionPosition: string;

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

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'GobiernoUsuarioID_Ref' })
  user: User;
}
