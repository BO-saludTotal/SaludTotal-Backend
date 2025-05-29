import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { AvailabilitySlot } from './availabilitySlot';
import { User } from './user';
import { AppointmentChangeHistory } from './appointmentChangeHistory';
import { ClinicalRecordEntry } from './clinicalRecordEntry';
import { AttentionType } from './attentionType';
import { PatientDetail } from './patientDetail';

export type AppointmentStatusType =
  | 'Solicitada'
  | 'Confirmada'
  | 'Modificada'
  | 'CanceladaPorPaciente'
  | 'CanceladaPorMedico'
  | 'Realizada'
  | 'NoAsistio';

@Entity({ name: 'CitasMedicas' })
export class MedicalAppointment extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'CitaID', type: 'int' })
  id: number;

  @Column({ name: 'SlotID_Ref', type: 'int', unique: true, nullable: false })
  slotId: number;

  @Column({
    name: 'PacienteUsuarioID_Ref',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  patientUserId: string;

  @CreateDateColumn({ name: 'FechaHoraSolicitudCita', type: 'datetime' })
  requestDateTime: Date;

  @Column({
    name: 'EstadoCita',
    type: 'enum',
    enum: [
      'Solicitada',
      'Confirmada',
      'Modificada',
      'CanceladaPorPaciente',
      'CanceladaPorMedico',
      'Realizada',
      'NoAsistio',
    ],
    nullable: false,
  })
  status: AppointmentStatusType;

  @Column({ name: 'MotivoConsultaPaciente', type: 'text', nullable: true })
  patientReason?: string | null;

  @OneToOne(() => AvailabilitySlot, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'SlotID_Ref', referencedColumnName: 'id' })
  slot: AvailabilitySlot;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'PacienteUsuarioID_Ref', referencedColumnName: 'id' })
  patientUser: User;

  @ManyToOne(() => PatientDetail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ 
    name: 'DetallePacienteID_Ref', 
    referencedColumnName: 'patientUserId' 
  })
  patientDetail: PatientDetail;

  @OneToMany(() => AppointmentChangeHistory, (history) => history.appointment)
  changeHistory: AppointmentChangeHistory[];

  @OneToMany(() => ClinicalRecordEntry, (entry) => entry.associatedAppointment)
  clinicalRecords: ClinicalRecordEntry[];

  @ManyToOne(
    () => AttentionType,
    (at) => at.appointmentsRelacionadosConMedicalAppointment,
  )
  @JoinColumn({ name: 'TipoAtencionID_Ref' })
  attentionType: AttentionType;
}
