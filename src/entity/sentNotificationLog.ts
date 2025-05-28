import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user';
import { NotificationType } from './notificationType';

export type NotificationChannel =
  | 'Email'
  | 'SMS'
  | 'PushApp'
  | 'SistemaInterno';
export type NotificationStatus =
  | 'Pendiente'
  | 'EnviadoExitoso'
  | 'Fallido'
  | 'Leido';

@Entity({ name: 'LogNotificacionesEnviadas' })
export class SentNotificationLog extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'NotificacionEnviadaID', type: 'int' })
  id: number;

  @Column({
    name: 'UsuarioID_Destinatario_Ref',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  recipientUserId?: string | null;

  @Column({ name: 'TipoNotificacionID_Ref', type: 'int', nullable: true })
  notificationTypeId?: number | null;

  @Column({
    name: 'CanalEnvioUtilizado',
    type: 'enum',
    enum: ['Email', 'SMS', 'PushApp', 'SistemaInterno'],
    nullable: true,
  })
  channelUsed?: NotificationChannel | null;

  @Column({
    name: 'DireccionDestino',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  destinationAddress?: string | null;

  @Column({ name: 'FechaHoraEnvioEfectivo', type: 'datetime', nullable: true })
  effectiveSentDateTime?: Date | null;

  @Column({
    name: 'EstadoEnvio',
    type: 'enum',
    enum: ['Pendiente', 'EnviadoExitoso', 'Fallido', 'Leido'],
    nullable: true,
  })
  sendStatus?: NotificationStatus | null;

  @Column({ name: 'ContenidoMensajeEnviado', type: 'text', nullable: true })
  sentMessageContent?: string | null;

  @ManyToOne(() => User, (user) => user.receivedNotifications, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'UsuarioID_Destinatario_Ref',
    referencedColumnName: 'id',
  })
  recipientUser?: User | null;

  @ManyToOne(() => NotificationType, (type) => type.sentLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'TipoNotificacionID_Ref', referencedColumnName: 'id' })
  notificationType?: NotificationType | null;
}
