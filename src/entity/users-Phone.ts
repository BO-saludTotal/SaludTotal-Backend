import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  //Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user';

export type TipoTelefonoType = 'Móvil' | 'Casa' | 'Trabajo';

@Entity({ name: 'TelefonosUsuario' })
export class UsersPhone extends BaseEntity {
  @PrimaryColumn({
    name: 'UsuarioID_Ref',
    type: 'int',
  })
  usuarioId: number;

  @PrimaryColumn({
    name: 'NumeroTelefono',
    type: 'varchar',
    length: 25,
  })
  numeroTelefono: string;

  @Column({
    name: 'TipoTelefono',
    type: 'enum',
    enum: ['Móvil', 'Casa', 'Trabajo'],
    nullable: true,
  })
  tipoTelefono?: TipoTelefonoType;

  @Column({
    name: 'EsPrincipal',
    type: 'boolean',
    default: false,
  })
  esPrincipal: boolean;

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

  @ManyToOne(() => User, (user) => user.telefonos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'UsuarioID_Ref' })
  usuario: User;
}
