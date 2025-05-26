
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

import { MedicalAppointment } from "./medicalAppointment";
import { AvailabilitySlot } from "./availabilitySlot";

@Entity({ name: 'TiposAtencionCatalogo' })
export class AttentionType {
    @PrimaryGeneratedColumn({
        name: 'TipoAtencionID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'NombreTipoAtencion',
        type: 'varchar',
        length: 150,
        unique: true,
        nullable: false
    })
    @Index('IDX_NombreTipoAtencion', { unique: true })
    name: string;

    @Column({
        name: 'DuracionEstimadaMinutos',
        type: 'int',
        nullable: true,
        comment: 'Estimated duration in minutes for this type of attention'
    })
    estimatedDurationMinutes: number | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp',

    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp',

    })
    updatedAt: Date;

    
    @OneToMany(() => MedicalAppointment, (appointment) => appointment.attentionType)
    appointments: MedicalAppointment[];

    
    @OneToMany(() => AvailabilitySlot, (slot) => slot.attentionType)
    availabilitySlots: AvailabilitySlot[];


}