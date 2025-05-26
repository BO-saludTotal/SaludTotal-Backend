
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { DoctorDetail } from "./doctorDetail";

@Entity({ name: 'BloqueosExcepcionesHorario' })
export class ScheduleBlockException {
    @PrimaryGeneratedColumn({
        name: 'BloqueoID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'MedicoUsuarioID_Ref',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    doctorUserId: string;

    @Column({
        name: 'FechaHoraInicioBloqueo',
        type: 'datetime',
        nullable: false
    })
    startDateTime: Date;

    @Column({
        name: 'FechaHoraFinBloqueo',
        type: 'datetime',
        nullable: false
    })
    endDateTime: Date;

    @Column({
        name: 'MotivoBloqueo',
        type: 'text',
        nullable: true
    })
    blockReason: string | null;

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

  
    @ManyToOne(() => DoctorDetail, (doctor) => doctor.scheduleBlocks, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'MedicoUsuarioID_Ref' })
    doctor: DoctorDetail;
}