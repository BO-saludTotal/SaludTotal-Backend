
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
import { HealthEntity } from "./healthEntity";
import { PhysicalAttentionSpace } from "./physicalAttentionSpace";

export type Weekday = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

@Entity({ name: 'HorariosPlantillaMedico' })
export class DoctorScheduleTemplate {
    @PrimaryGeneratedColumn({
        name: 'HorarioPlantillaID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'MedicoUsuarioID_Ref',
        type: 'int',
        nullable: false
    })
    doctorUserId: number;

    @Column({
        name: 'EntidadSaludID_Ref',
        type: 'int',
        nullable: false
    })
    healthEntityId: number;

    @Column({
        name: 'EspacioID_Ref',
        type: 'int',
        nullable: true
    })
    spaceId: number | null;

    @Column({
        name: 'DiaSemana',
        type: 'enum',
        enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        nullable: false
    })
    weekday: Weekday;

    @Column({
        name: 'HoraInicio',
        type: 'time',
        nullable: false
    })
    startTime: string;

    @Column({
        name: 'HoraFin',
        type: 'time',
        nullable: false
    })
    endTime: string;

    @Column({
        name: 'ValidoDesde',
        type: 'date',
        nullable: false
    })
    validFrom: Date;

    @Column({
        name: 'ValidoHasta',
        type: 'date',
        nullable: true
    })
    validUntil: Date | null;

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


    @ManyToOne(() => DoctorDetail, (doctor) => doctor.scheduleTemplates, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'MedicoUsuarioID_Ref' })
    doctor: DoctorDetail;

  
    @ManyToOne(() => HealthEntity, (entity) => entity.doctorSchedules, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntidadSaludID_Ref' })
    healthEntity: HealthEntity;


    @ManyToOne(() => PhysicalAttentionSpace, (space) => space.doctorSchedules, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EspacioID_Ref' })
    space: PhysicalAttentionSpace | null;


    isCurrentlyValid(): boolean {
        const today = new Date();
        return today >= this.validFrom && 
               (this.validUntil === null || today <= this.validUntil);
    }
}