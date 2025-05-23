
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import { PatientDetail } from "./patientDetails";
import { DoctorDetail } from "./doctorDetail";
import { HealthEntity } from "./healthEntity";
import { PhysicalAttentionSpace } from "./physicalAttentionSpace";
import { MedicalAppointment } from "./medicalAppointment";
import { MedicalEventType } from "./medicalEventType";
import { ClinicalRecordDiagnosis } from "./clinicalRecordDiagnosis";
import { ClinicalRecordAttachment } from "./clinicalRecordAttachment";
import { ExamResult } from "./examResult";
import { ExamParameter } from "./examParameter";
import { Prescription } from "./prescription";

@Entity({ name: 'HistorialesClinicosEntradas' })
export class ClinicalRecordEntry extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'EntradaHistorialID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'PacienteUsuarioID_Ref',
        type: 'int',
        nullable: false
    })
    patientUserId: number;

    @Column({
        name: 'MedicoUsuarioID_Atendio_Ref',
        type: 'int',
        nullable: false
    })
    doctorUserId: number;

    @Column({
        name: 'EntidadSaludID_Atencion_Ref',
        type: 'int',
        nullable: false
    })
    healthEntityId: number;

    @Column({
        name: 'EspacioID_Atencion_Ref',
        type: 'int',
        nullable: true
    })
    spaceId: number | null;

    @Column({
        name: 'CitaID_Asociada_Ref',
        type: 'int',
        nullable: true
    })
    appointmentId: number | null;

    @Column({
        name: 'TipoEventoMedicoID_Ref',
        type: 'int',
        nullable: false
    })
    eventTypeId: number;

    @Column({
        name: 'FechaHoraAtencionInicio',
        type: 'datetime',
        nullable: false
    })
    attentionStartDateTime: Date;

    @Column({
        name: 'ResumenNarrativoAtencion',
        type: 'text',
        nullable: true
    })
    narrativeSummary: string | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp'
    })
    updatedAt: Date;

   
    @ManyToOne(() => PatientDetail, (patient) => patient.clinicalRecords, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'PacienteUsuarioID_Ref' })
    patient: PatientDetail;

    
    @ManyToOne(() => DoctorDetail, (doctor) => doctor.clinicalRecords)
    @JoinColumn({ name: 'MedicoUsuarioID_Atendio_Ref' })
    doctor: DoctorDetail;

    @ManyToOne(() => HealthEntity, (entity) => entity.clinicalRecords, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntidadSaludID_Atencion_Ref' })
    healthEntity: HealthEntity;

    @ManyToOne(() => PhysicalAttentionSpace, (space) => space.clinicalRecords, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EspacioID_Atencion_Ref' })
    space: PhysicalAttentionSpace | null;

    @ManyToOne(() => MedicalAppointment, (appointment) => appointment.clinicalRecords, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'CitaID_Asociada_Ref' })
    appointment: MedicalAppointment | null;

    @ManyToOne(() => MedicalEventType, (eventType) => eventType.clinicalRecords, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'TipoEventoMedicoID_Ref' })
    eventType: MedicalEventType;

    @OneToMany(() => ClinicalRecordDiagnosis, (diagnosis) => diagnosis.recordEntry)
    diagnoses: ClinicalRecordDiagnosis[];
    
    @OneToMany(() => ExamResult, (result) => result.recordEntry)
    examResults: ExamResult[];

    @OneToMany(() => ExamParameter, (param) => param.recordEntry)
    examParametes: ExamParameter[];

    @OneToMany(() => ClinicalRecordAttachment, (attachment) => attachment.recordEntry)
    attachments: ClinicalRecordAttachment[];

    @OneToMany(() => Prescription, (prescription) => prescription.recordEntry)
    prescriptions: Prescription[];

}