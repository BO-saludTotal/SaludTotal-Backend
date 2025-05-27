
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, BaseEntity, OneToMany } from "typeorm";
import { HealthEntity } from "./healthEntity";
import { DoctorScheduleTemplate } from "./doctorScheduleTemplate";
import { AvailabilitySlot } from "./availabilitySlot";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";


export type SpaceType = 'Consultorio Médico' | 'Sala Procedimientos' | 'Laboratorio Toma Muestras' | 'Quirófano';

@Entity({ name: 'EspaciosFisicosAtencion' })
@Index(["healthEntityId", "spaceName"], { unique: true }) // Corresponde a UNIQUE (`EntidadSaludID_Ref`, `NombreEspacio`)
export class PhysicalAttentionSpace extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'EspacioID', type: 'int' })
    id: number;

    @Column({ name: 'EntidadSaludID_Ref', type: 'int', nullable: false })
    healthEntityId: number;

    @Column({ name: 'NombreEspacio', type: 'varchar', length: 150, nullable: false })
    spaceName: string;

    @Column({
        name: 'TipoEspacio',
        type: 'enum',
        enum: ['Consultorio Médico', 'Sala Procedimientos', 'Laboratorio Toma Muestras', 'Quirófano'],
        nullable: false
    })
    spaceType: SpaceType;

    @ManyToOne(() => HealthEntity, healthEntity => healthEntity.attentionSpaces, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'EntidadSaludID_Ref', referencedColumnName: 'id' })
    healthEntity: HealthEntity;

    @OneToMany(() => DoctorScheduleTemplate, template => template.attentionSpace)
    scheduleTemplates: DoctorScheduleTemplate[];

    @OneToMany(() => AvailabilitySlot, slot => slot.attentionSpace)
    availabilitySlots: AvailabilitySlot[];

    @OneToMany(() => ClinicalRecordEntry, entry => entry.attentionSpace)
    clinicalRecords: ClinicalRecordEntry[];
}