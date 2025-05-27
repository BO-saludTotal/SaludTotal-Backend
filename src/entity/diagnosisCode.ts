
import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ClinicalRecordDiagnosis } from "./clinicalRecordDiagnosis";

@Entity({ name: 'DiagnosticosCIE_Catalogo' })
export class DiagnosisCode extends BaseEntity {
    @PrimaryColumn({ name: 'CodigoCIE', type: 'varchar', length: 10 })
    cieCode: string;

    @Column({ name: 'DescripcionCIE', type: 'text', nullable: false })
    description: string;

    @Column({ name: 'VersionCIE', type: 'varchar', length: 10, nullable: false })
    cieVersion: string;

    @OneToMany(() => ClinicalRecordDiagnosis, crd => crd.diagnosisCode)
    clinicalRecordDiagnoses: ClinicalRecordDiagnosis[];
}