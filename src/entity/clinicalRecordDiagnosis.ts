import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";
import { DiagnosisCode } from "./diagnosisCode";

export type DiagnosisType = 'Principal' | 'Secundario' | 'Presuntivo' | 'Confirmado';

@Entity({ name: 'EntradaHistorialDiagnosticos' })
export class ClinicalRecordDiagnosis extends BaseEntity {
    @PrimaryColumn({ name: 'EntradaHistorialID_Ref', type: 'int' })
    clinicalRecordEntryId: number;

    @PrimaryColumn({ name: 'CodigoCIE_Ref', type: 'varchar', length: 10 })
    cieCode: string;

    @Column({
        name: 'TipoDiagnostico',
        type: 'enum',
        enum: ['Principal', 'Secundario', 'Presuntivo', 'Confirmado'],
        default: 'Principal',
        nullable: false
    })
    diagnosisType: DiagnosisType;

    @ManyToOne(() => ClinicalRecordEntry, entry => entry.diagnoses, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'EntradaHistorialID_Ref'})
    clinicalRecordEntry: ClinicalRecordEntry;

    @ManyToOne(() => DiagnosisCode, code => code.clinicalRecordDiagnoses, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'CodigoCIE_Ref', referencedColumnName: 'cieCode' })
    diagnosisCode: DiagnosisCode;
}
