import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { SentNotificationLog } from './sentNotificationLog';

@Entity({ name: 'TiposNotificacionCatalogo' })
export class NotificationType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'TipoNotificacionID', type: 'int' })
  id: number;

  @Column({
    name: 'NombreTipoNotificacion',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  notificationTypeName: string;

  @Column({ name: 'PlantillaMensajeDefault', type: 'text', nullable: true })
  defaultMessageTemplate?: string | null;

  @OneToMany(() => SentNotificationLog, (log) => log.notificationType)
  sentLogs: SentNotificationLog[];
}
