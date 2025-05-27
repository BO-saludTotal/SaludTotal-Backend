
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, BaseEntity } from "typeorm";
import { AdministrativeStaffDetail } from "./administrativeStaffDetail";
import { DoctorHealthEntityAffiliation } from "./doctorHealthEntityAffiliation";
import { DoctorScheduleTemplate } from "./doctorScheduleTemplate";
import { PhysicalAttentionSpace } from "./physicalAttentionSpace";
import { AvailabilitySlot } from "./availabilitySlot";
import { HealthEntitySpecialty } from "./healthEntitySpecialty";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";


export type HealthEntityType = 'Hospital' | 'Clínica' | 'Consultorio' | 'Laboratorio' | 'Centro Diagnóstico';

@Entity({ name: 'EntidadesSalud' })
export class HealthEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'EntidadSaludID', type: 'int' })
    id: number;

    @Column({ name: 'NombreOficial', type: 'varchar', length: 255, unique: true, nullable: false })
    @Index('IDX_EntidadesSalud_NombreOficialUnico', { unique: true })
    officialName: string;

    @Column({
        name: 'TipoEntidad',
        type: 'enum',
        enum: ['Hospital', 'Clínica', 'Consultorio', 'Laboratorio', 'Centro Diagnóstico'],
        nullable: false
    })
    entityType: HealthEntityType;

    @Column({ name: 'DireccionCompleta', type: 'text', nullable: true })
    fullAddress?: string | null;

    @OneToMany(() => AdministrativeStaffDetail, staff => staff.assignedHealthEntity)
    administrativeStaff: AdministrativeStaffDetail[];

    @OneToMany(() => DoctorHealthEntityAffiliation, affiliation => affiliation.healthEntity)
    doctorAffiliations: DoctorHealthEntityAffiliation[];

    @OneToMany(() => DoctorScheduleTemplate, template => template.healthEntity)
    scheduleTemplates: DoctorScheduleTemplate[];

    @OneToMany(() => PhysicalAttentionSpace, space => space.healthEntity)
    attentionSpaces: PhysicalAttentionSpace[];

    @OneToMany(() => AvailabilitySlot, slot => slot.healthEntity)
    availabilitySlots: AvailabilitySlot[];

    @OneToMany(() => HealthEntitySpecialty, hes => hes.healthEntity)
    offeredSpecialties: HealthEntitySpecialty[];

    @OneToMany(() => ClinicalRecordEntry, entry => entry.attentionHealthEntity)
    clinicalRecords: ClinicalRecordEntry[];
}