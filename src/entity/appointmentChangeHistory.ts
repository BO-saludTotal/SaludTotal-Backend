
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import { MedicalAppointment } from "./medicalAppointment";
import { User } from "./user";

@Entity({ name: 'HistorialCambiosCita' })
export class AppointmentChangeHistory extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'CambioCitaID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'CitaID_Ref',
        type: 'int',
        nullable: false
    })
    appointmentId: number;

    @CreateDateColumn({
        name: 'FechaHoraCambio',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    changeDateTime: Date;

    @Column({
        name: 'UsuarioID_RealizaCambio_Ref',
        type: 'int',
        nullable: true
    })
    changedByUserId: number | null;

    @Column({
        name: 'EstadoAnterior',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    previousStatus: string | null;

    @Column({
        name: 'EstadoNuevo',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    newStatus: string | null;

    @Column({
        name: 'MotivoCambioCancelacion',
        type: 'text',
        nullable: true
    })
    changeReason: string | null;

  
    @ManyToOne(() => MedicalAppointment, (appointment) => appointment.changeHistory, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'CitaID_Ref' })
    appointment: MedicalAppointment;


    @ManyToOne(() => User, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_RealizaCambio_Ref' })
    changedByUser: User | null;

}