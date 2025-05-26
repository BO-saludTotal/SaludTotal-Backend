
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    BaseEntity
} from "typeorm";
import { User } from "./user";
import { AuditActionType } from "./auditActionType";

export type ActionResult = 'Exitoso' | 'Fallido' | 'Parcial';

@Entity({ name: 'RegistrosAuditoriaSistema' })
export class SystemAuditLog extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'LogID',
        type: 'bigint'
    })
    id: number;

    @Column({
        name: 'TimestampEvento',
        type: 'datetime',

    })
    @Index('IDX_TimestampEvento')
    timestamp: Date;

    @Column({
        name: 'UsuarioID_Actor_Ref',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    actorUserId: string | null;

    @Column({
        name: 'TipoAccionID_Ref',
        type: 'int',
        nullable: false
    })
    actionTypeId: number;

    @Column({
        name: 'DescripcionDetalladaEvento',
        type: 'text',
        nullable: true
    })
    description: string | null;

    @Column({
        name: 'DireccionIPOrigen',
        type: 'varchar',
        length: 45,
        nullable: true
    })
    sourceIp: string | null;

    @Column({
        name: 'ResultadoAccion',
        type: 'enum',
        enum: ['Exitoso', 'Fallido', 'Parcial'],
        nullable: true
    })
    result: ActionResult | null;

   
    @ManyToOne(() => User, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_Actor_Ref' })
    actor: User | null;

    @ManyToOne(() => AuditActionType, (type) => type.auditLogs, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'TipoAccionID_Ref' })
    actionType: AuditActionType;

}