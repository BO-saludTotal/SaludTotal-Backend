import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Role } from './role';

@Entity({ name: 'UsuarioRolesAsignados' })
export class UserAssignedRole {
  @PrimaryColumn({ name: 'UsuarioID_Ref', type: 'int' })
  userId: number;

  @PrimaryColumn({ name: 'RolID_Ref', type: 'int' })
  roleId: number;

  @CreateDateColumn({
    name: 'FechaAsignacion',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  assignmentDate: Date;

  @Column({
    name: 'FechaFinAsignacion',
    type: 'date',
    nullable: true,
  })
  endDate: Date | null;

  @ManyToOne(() => User, (user) => user.assignedRoles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'UsuarioID_Ref' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userAssignments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'RolID_Ref' })
  role: Role;
}
