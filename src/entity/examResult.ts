
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
} from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";
import { ExamResultDetail } from "./examResultDetail";
import { PrescriptionMedicationDetail } from "./prescriptionMedicationDetail";


@Entity({ name: 'EntradaHistorialResultadosExamenes' })
export class ExamResult {
    @PrimaryGeneratedColumn({
        name: 'ResultadoExamenID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'EntradaHistorialID_Ref',
        type: 'int',
        nullable: false
    })
    recordEntryId: number;

    @Column({
        name: 'NombreExamenGeneral',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    examName: string;

    @Column({
        name: 'FechaEmisionResultado',
        type: 'datetime',
        nullable: true
    })
    resultDate: Date | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

    
    @ManyToOne(() => ClinicalRecordEntry, (entry) => entry.examResults, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntradaHistorialID_Ref' })
    recordEntry: ClinicalRecordEntry;

    @OneToMany(() => ExamResultDetail, (detail) => detail.examResult)
    parameters: ExamResultDetail[];

    @OneToMany(() => PrescriptionMedicationDetail, (medications) => medications.results)
    medications: PrescriptionMedicationDetail[];

}