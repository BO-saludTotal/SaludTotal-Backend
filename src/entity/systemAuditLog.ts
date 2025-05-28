import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user';
import { AuditActionType } from './auditActionType';

export type ActionResult = 'Exitoso' | 'Fallido' | 'Parcial';

@Entity({ name: 'RegistrosAuditoriaSistema' })
export class SystemAuditLog extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'LogID', type: 'bigint' })
  id: string;

  @CreateDateColumn({ name: 'TimestampEvento', type: 'datetime' })
  eventTimestamp: Date;

  @Column({
    name: 'UsuarioID_Actor_Ref',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  actorUserId?: string | null;

  @Column({ name: 'TipoAccionID_Ref', type: 'int', nullable: false })
  actionTypeId: number;

  @Column({ name: 'DescripcionDetalladaEvento', type: 'text', nullable: true })
  detailedEventDescription?: string | null;

  @Column({
    name: 'DireccionIPOrigen',
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  sourceIpAddress?: string | null;

  @Column({
    name: 'ResultadoAccion',
    type: 'enum',
    enum: ['Exitoso', 'Fallido', 'Parcial'],
    nullable: true,
  })
  actionResult?: ActionResult | null;

  @ManyToOne(() => User, (user) => user.auditLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'UsuarioID_Actor_Ref', referencedColumnName: 'id' })
  actorUser?: User | null;

  @ManyToOne(() => AuditActionType, (type) => type.auditLogs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TipoAccionID_Ref', referencedColumnName: 'id' })
  actionType: AuditActionType;
}
