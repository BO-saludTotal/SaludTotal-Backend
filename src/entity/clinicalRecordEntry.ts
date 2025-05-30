import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  //CreateDateColumn,
  //UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { HealthEntity } from './healthEntity';
import { PhysicalAttentionSpace } from './physicalAttentionSpace';
import { MedicalAppointment } from './medicalAppointment';
import { MedicalEventType } from './medicalEventType';
import { ClinicalRecordDiagnosis } from './clinicalRecordDiagnosis';
import { ClinicalRecordAttachment } from './clinicalRecordAttachment';
import { ExamResult } from './examResult';
import { Prescription } from './prescription';
import { PatientDetail } from './patientDetail';

@Entity({ name: 'HistorialesClinicosEntradas' })
export class ClinicalRecordEntry extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'EntradaHistorialID', type: 'int' })
  id: number;

  @Column({
    name: 'PacienteUsuarioID_Ref',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  patientUserId: string;

  @Column({
    name: 'MedicoUsuarioID_Atendio_Ref',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  attendingDoctorUserId: string;

  @Column({ name: 'EntidadSaludID_Atencion_Ref', type: 'int', nullable: false })
  attentionHealthEntityId: number;

  @Column({ name: 'EspacioID_Atencion_Ref', type: 'int', nullable: true })
  attentionSpaceId?: number | null;

  @Column({ name: 'CitaID_Asociada_Ref', type: 'int', nullable: true })
  associatedAppointmentId?: number | null;

  @Column({ name: 'TipoEventoMedicoID_Ref', type: 'int', nullable: false })
  eventTypeId: number;

  @Column({
    name: 'FechaHoraAtencionInicio',
    type: 'datetime',
    nullable: false,
  })
  attentionStartDateTime: Date;

  @Column({ name: 'ResumenNarrativoAtencion', type: 'text', nullable: true })
  narrativeSummary?: string | null;

   @ManyToOne(() => User, (user) => user.clinicalEntriesAsPatient, { 
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PacienteUsuarioID_Ref', referencedColumnName: 'id' })
  patientUser: User;

  @ManyToOne(() => User, (user) => user.clinicalEntriesAsDoctor, { 
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Atendio_Ref', referencedColumnName: 'id' })
  attendingDoctor: User; 

  @ManyToOne(() => HealthEntity, (entity) => entity.clinicalRecords, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'EntidadSaludID_Atencion_Ref',
    referencedColumnName: 'id',
  })
  attentionHealthEntity: HealthEntity;

  @ManyToOne(() => PhysicalAttentionSpace, (space) => space.clinicalRecords, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'EspacioID_Atencion_Ref', referencedColumnName: 'id' })
  attentionSpace?: PhysicalAttentionSpace | null;

  @ManyToOne(
    () => MedicalAppointment,
    (appointment) => appointment.clinicalRecords,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'CitaID_Asociada_Ref', referencedColumnName: 'id' })
  associatedAppointment?: MedicalAppointment | null;

  @ManyToOne(() => MedicalEventType, (eventType) => eventType.clinicalRecords, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TipoEventoMedicoID_Ref', referencedColumnName: 'id' })
  eventType: MedicalEventType;

  @OneToMany(
    () => ClinicalRecordDiagnosis,
    (diagnosis) => diagnosis.clinicalRecordEntry,
  )
  diagnoses: ClinicalRecordDiagnosis[];

  @OneToMany(
    () => Prescription,
    (prescription) => prescription.clinicalRecordEntry,
  )
  prescriptions: Prescription[];

  @OneToMany(() => ExamResult, (result) => result.clinicalRecordEntry)
  examResults: ExamResult[];

  @OneToMany(
    () => ClinicalRecordAttachment,
    (attachment) => attachment.clinicalRecordEntry,
  )
  attachments: ClinicalRecordAttachment[];
}
