
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { HealthEntity } from "./healthEntity";
import { DoctorScheduleTemplate } from "./doctorScheduleTemplate";
import { AvailabilitySlot } from "./availabilitySlot";


export type SpaceType = 'Consultorio Médico' | 'Sala Procedimientos' | 'Laboratorio Toma Muestras' | 'Quirófano';

@Entity({ name: 'EspaciosFisicosAtencion' })
export class PhysicalAttentionSpace {
    @PrimaryGeneratedColumn({
        name: 'EspacioID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'EntidadSaludID_Ref',
        type: 'int',
        nullable: false
    })
    healthEntityId: number;

    @Column({
        name: 'NombreEspacio',
        type: 'varchar',
        length: 150,
        nullable: false
    })
    name: string;

    @Column({
        name: 'TipoEspacio',
        type: 'enum',
        enum: ['Consultorio Médico', 'Sala Procedimientos', 'Laboratorio Toma Muestras', 'Quirófano'],
        nullable: false
    })
    spaceType: SpaceType;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

  
    @ManyToOne(() => HealthEntity, (healthEntity) => healthEntity.attentionSpaces, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntidadSaludID_Ref' })
    healthEntity: HealthEntity;

    @OneToMany(() => DoctorScheduleTemplate, (template) => template.space)
    doctorSchedules: DoctorScheduleTemplate[];

    @OneToMany(() => AvailabilitySlot, (slot) => slot.space)
    availabilitySlots: AvailabilitySlot[];
    
    @Index('IDX_EspacioUnicoPorEntidad', { unique: true })
    @Column()
    uniqueSpaceConstraint: string; 


    getFullSpaceName(): string {
        return `${this.name} (${this.spaceType}) - ${this.healthEntity.officialName}`;
    }
}