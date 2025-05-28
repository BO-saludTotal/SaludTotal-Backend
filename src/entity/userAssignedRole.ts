import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user';
import { Role } from './role';

@Entity({ name: 'UsuarioRolesAsignados' })
export class UserAssignedRole extends BaseEntity {
  @PrimaryColumn({ name: 'UsuarioID_Ref', type: 'varchar', length: 36 })
  userId: string;

  @PrimaryColumn({ name: 'RolID_Ref', type: 'int' })
  roleId: number;

  @CreateDateColumn({ name: 'FechaAsignacion', type: 'datetime' })
  assignmentDate: Date;

  @Column({ name: 'FechaFinAsignacion', type: 'date', nullable: true })
  assignmentEndDate?: Date | null;

  @ManyToOne(() => User, (user) => user.assignedRoles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'UsuarioID_Ref', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userAssignments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RolID_Ref', referencedColumnName: 'id' })
  role: Role;
}
