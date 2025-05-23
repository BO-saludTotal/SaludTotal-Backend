
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import { User } from "./user";
import { NotificationType } from "./notificationType";

export type NotificationChannel = 'Email' | 'SMS' | 'PushApp' | 'SistemaInterno';
export type NotificationStatus = 'Pendiente' | 'EnviadoExitoso' | 'Fallido' | 'Leido';

@Entity({ name: 'LogNotificacionesEnviadas' })
export class SentNotificationLog extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'NotificacionEnviadaID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'UsuarioID_Destinatario_Ref',
        type: 'int',
        nullable: true
    })
    recipientUserId: number | null;

    @Column({
        name: 'TipoNotificacionID_Ref',
        type: 'int',
        nullable: true
    })
    notificationTypeId: number | null;

    @Column({
        name: 'CanalEnvioUtilizado',
        type: 'enum',
        enum: ['Email', 'SMS', 'PushApp', 'SistemaInterno'],
        nullable: true
    })
    channel: NotificationChannel | null;

    @Column({
        name: 'DireccionDestino',
        type: 'varchar',
        length: 255,
        nullable: true
    })
    destinationAddress: string | null;

    @Column({
        name: 'FechaHoraEnvioEfectivo',
        type: 'datetime',
        nullable: true
    })
    sentAt: Date | null;

    @Column({
        name: 'EstadoEnvio',
        type: 'enum',
        enum: ['Pendiente', 'EnviadoExitoso', 'Fallido', 'Leido'],
        nullable: true
    })
    status: NotificationStatus | null;

    @Column({
        name: 'ContenidoMensajeEnviado',
        type: 'text',
        nullable: true
    })
    messageContent: string | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

    
    @ManyToOne(() => User, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_Destinatario_Ref' })
    recipient: User | null;

    @ManyToOne(() => NotificationType, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'TipoNotificacionID_Ref' })
    notificationType: NotificationType | null;

    
    markAsSent(): this {
        this.status = 'EnviadoExitoso';
        this.sentAt = new Date();
        return this;
    }

    markAsFailed(): this {
        this.status = 'Fallido';
        this.sentAt = new Date();
        return this;
    }

    static async logNotification(
        recipientId: number | null,
        typeId: number,
        channel: NotificationChannel,
        destination: string,
        message: string
    ): Promise<SentNotificationLog> {
        const log = new SentNotificationLog();
        log.recipientUserId = recipientId;
        log.notificationTypeId = typeId;
        log.channel = channel;
        log.destinationAddress = destination;
        log.messageContent = message;
        log.status = 'Pendiente';
        await log.save();
        return log;
    }
}