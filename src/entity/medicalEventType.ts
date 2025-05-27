
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";

@Entity({ name: 'TiposEventoMedicoCatalogo' })
export class MedicalEventType extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'TipoEventoMedicoID', type: 'int' })
    id: number;

    @Column({ name: 'NombreTipoEvento', type: 'varchar', length: 150, unique: true, nullable: false })
    eventTypeName: string;

    @Column({ name: 'DescripcionTipoEvento', type: 'text', nullable: true })
    description?: string | null;

    @OneToMany(() => ClinicalRecordEntry, entry => entry.eventType)
    clinicalRecords: ClinicalRecordEntry[];
}