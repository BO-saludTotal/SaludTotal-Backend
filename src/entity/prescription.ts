
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";
import { PrescriptionMedicationDetail } from "./prescriptionMedicationDetail";

@Entity({ name: 'EntradaHistorialPrescripciones' })
export class Prescription extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'PrescripcionID', type: 'int' })
    id: number;

    @Column({ name: 'EntradaHistorialID_Ref', type: 'int', nullable: false })
    clinicalRecordEntryId: number;

    @CreateDateColumn({ name: 'FechaPrescripcion', type: 'datetime' })
    prescriptionDate: Date;

    @ManyToOne(() => ClinicalRecordEntry, entry => entry.prescriptions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'EntradaHistorialID_Ref'})
    clinicalRecordEntry: ClinicalRecordEntry;

    @OneToMany(() => PrescriptionMedicationDetail, detail => detail.prescription)
    medicationDetails: PrescriptionMedicationDetail[];
}