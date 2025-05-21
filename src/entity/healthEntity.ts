
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

import { AdministrativeStaffDetail } from "./administrativeStaffDetail";
import { PhysicalAttentionSpace } from "./physicalAttentionSpace";
import { DoctorScheduleTemplate } from "./doctorScheduleTemplate";
import { AvailabilitySlot } from "./availabilitySlot";

export type HealthEntityType = 'Hospital' | 'Clínica' | 'Consultorio' | 'Laboratorio' | 'Centro Diagnóstico';

@Entity({ name: 'EntidadesSalud' })
export class HealthEntity {
    @PrimaryGeneratedColumn({ 
        name: 'EntidadSaludID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'NombreOficial',
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    @Index('IDX_NombreOficial', { unique: true })
    officialName: string;

    @Column({
        name: 'TipoEntidad',
        type: 'enum',
        enum: ['Hospital', 'Clínica', 'Consultorio', 'Laboratorio', 'Centro Diagnóstico'],
        nullable: false
    })
    entityType: HealthEntityType;

    @Column({
        name: 'DireccionCompleta',
        type: 'text',
        nullable: true
    })
    fullAddress: string | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @OneToMany(() => PhysicalAttentionSpace, (space) => space.healthEntity)
    attentionSpaces: PhysicalAttentionSpace[];

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @OneToMany(() => AdministrativeStaffDetail, (staff) => staff.assignedHealthEntity)
    administrativeStaff: AdministrativeStaffDetail[];

    @OneToMany(() => DoctorScheduleTemplate, (template) => template.healthEntity)
    doctorSchedules: DoctorScheduleTemplate[];

    @OneToMany(() => AvailabilitySlot, (slot) => slot.healthEntity)
    availabilitySlots: AvailabilitySlot[];

    getEntityTypeLabel(): string {
        const labels = {
            'Hospital': 'Hospital',
            'Clínica': 'Clinic',
            'Consultorio': 'Medical Office',
            'Laboratorio': 'Laboratory',
            'Centro Diagnóstico': 'Diagnostic Center'
        };
        return labels[this.entityType] || this.entityType;
    }
}