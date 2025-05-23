
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity
} from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";
import { DiagnosisCode } from "./diagnosisCode";

export type DiagnosisType = 'Principal' | 'Secundario' | 'Presuntivo' | 'Confirmado';

@Entity({ name: 'EntradaHistorialDiagnosticos' })
export class ClinicalRecordDiagnosis extends BaseEntity{
    @PrimaryColumn({
        name: 'EntradaHistorialID_Ref',
        type: 'int'
    })
    recordEntryId: number;

    @PrimaryColumn({
        name: 'CodigoCIE_Ref',
        type: 'varchar',
        length: 10
    })
    diagnosisCode: string;

    @Column({
        name: 'TipoDiagnostico',
        type: 'enum',
        enum: ['Principal', 'Secundario', 'Presuntivo', 'Confirmado'],
        default: 'Principal',
        nullable: false
    })
    diagnosisType: DiagnosisType;

   
    @ManyToOne(() => ClinicalRecordEntry, (entry) => entry.diagnoses, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntradaHistorialID_Ref' })
    recordEntry: ClinicalRecordEntry;

   
    @ManyToOne(() => DiagnosisCode, (code) => code.clinicalRecords, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'CodigoCIE_Ref' })
    diagnosis: DiagnosisCode;

 
    static async assignDiagnosisToRecord(
        recordEntryId: number,
        diagnosisCode: string,
        type: DiagnosisType = 'Principal'
    ): Promise<ClinicalRecordDiagnosis> {
        const diagnosis = new ClinicalRecordDiagnosis();
        diagnosis.recordEntryId = recordEntryId;
        diagnosis.diagnosisCode = diagnosisCode;
        diagnosis.diagnosisType = type;
        await diagnosis.save();
        return diagnosis;
    }
}