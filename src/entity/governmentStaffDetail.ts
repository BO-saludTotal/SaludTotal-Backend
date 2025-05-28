import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'PersonalGubernamentalDetalles' })
export class GovernmentStaffDetail extends BaseEntity {
  @PrimaryColumn({ name: 'GobiernoUsuarioID_Ref', type: 'varchar', length: 36 })
  governmentUserId: string;

  @Column({
    name: 'NombreInstitucionGubernamental',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  governmentalInstitutionName: string;

  @Column({
    name: 'CargoEnInstitucion',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  positionInInstitution: string;

  @OneToOne(() => User, (user) => user.governmentStaffDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'GobiernoUsuarioID_Ref', referencedColumnName: 'id' })
  user: User;
}
