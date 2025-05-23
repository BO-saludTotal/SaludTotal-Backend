
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from "typeorm";
import { SentNotificationLog } from "./sentNotificationLog";

@Entity({ name: 'TiposNotificacionCatalogo' })
export class NotificationType extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'TipoNotificacionID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'NombreTipoNotificacion',
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false
    })
    @Index('IDX_NombreTipoNotificacion', { unique: true })
    name: string;

    @Column({
        name: 'PlantillaMensajeDefault',
        type: 'text',
        nullable: true
    })
    defaultMessageTemplate: string | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp'
    })
    updatedAt: Date;

   
    @OneToMany(() => SentNotificationLog, (log) => log.notificationType)
    sentNotifications: SentNotificationLog[];


}