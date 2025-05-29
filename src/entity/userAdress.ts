import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  //Index,
  CreateDateColumn,
  UpdateDateColumn,
  //BeforeInsert,
  //BeforeUpdate,
  BaseEntity,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'CorreosElectronicosUsuario' })
export class UserAddress extends BaseEntity {
  @PrimaryColumn({
    name: 'UsuarioID_Ref',
    type: 'int',
  })
  usuarioId: number;

  @PrimaryColumn({
    name: 'CorreoElectronico',
    type: 'varchar',
    length: 255,
  })
  correoElectronico: string;

  @Column({
    name: 'EsPrincipal',
    type: 'boolean',
    default: false,
  })
  esPrincipal: boolean;

  @Column({
    name: 'Verificado',
    type: 'boolean',
    default: false,
  })
  verificado: boolean;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @UpdateDateColumn({
    name: 'FechaActualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fechaActualizacion: Date;

  @ManyToOne(() => User, (user) => user.emails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'UsuarioID_Ref' })
  usuario: User;
}
