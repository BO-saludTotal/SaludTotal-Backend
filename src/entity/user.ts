import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  Index,
  OneToMany,
  OneToOne,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserPhone } from './userPhone';
import { UserEmail } from './userEmail';
import { UserAssignedRole } from './userAssignedRole';
import { PatientDetail } from './patientDetail';
import { DoctorDetail } from './doctorDetail';
import { AdministrativeStaffDetail } from './administrativeStaffDetail';
import { GovernmentStaffDetail } from './governmentStaffDetail';
import { MedicalAppointment } from './medicalAppointment';
import { AppointmentChangeHistory } from './appointmentChangeHistory';
import { ClinicalRecordEntry } from './clinicalRecordEntry';
import { DoctorHealthEntityAffiliation } from './doctorHealthEntityAffiliation';
import { DoctorScheduleTemplate } from './doctorScheduleTemplate';
import { AvailabilitySlot } from './availabilitySlot';
import { ScheduleBlockException } from './scheduleBlockException';
import { SentNotificationLog } from './sentNotificationLog';
import { GeneratedReportHistory } from './generatedReportHistory';
import { SystemAuditLog } from './systemAuditLog';

export type AccountStatusType =
  | 'Activo'
  | 'Inactivo'
  | 'Bloqueado'
  | 'PendienteVerificacion';

@Entity({ name: 'Usuarios' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'UsuarioID', type: 'varchar', length: 36 })
  id: string;

  @Column({
    name: 'NombreUsuario',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  @Index('IDX_Usuarios_NombreUsuarioUnico', { unique: true })
  username: string;

  @Column({
    name: 'ContrasenaHash',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  passwordHash: string;

  @Column({
    name: 'NombreCompleto',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fullName: string;

  @CreateDateColumn({ name: 'FechaRegistro', type: 'datetime' })
  registrationDate: Date;

  @Column({
    name: 'EstadoCuenta',
    type: 'enum',
    enum: ['Activo', 'Inactivo', 'Bloqueado', 'PendienteVerificacion'],
    default: 'PendienteVerificacion',
    nullable: false,
  })
  accountStatus: AccountStatusType;

  @Column({ name: 'UltimoAcceso', type: 'datetime', nullable: true })
  lastAccess?: Date | null;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @OneToMany(() => UserPhone, (phone) => phone.user)
  phones: UserPhone[];

  @OneToMany(() => UserEmail, (email) => email.user)
  emails: UserEmail[];

  @OneToMany(() => UserAssignedRole, (assignment) => assignment.user)
  assignedRoles: UserAssignedRole[];

  @OneToOne(() => PatientDetail, detail => detail.user, {
        cascade: ['insert', 'update']
    })
  patientDetail: PatientDetail;


  @OneToOne(() => DoctorDetail, (detail) => detail.user, {
    cascade: ['insert', 'update'],
  })
  doctorDetail: DoctorDetail;

  @OneToOne(() => AdministrativeStaffDetail, (detail) => detail.user, {
    cascade: ['insert', 'update'],
  })
  administrativeStaffDetail: AdministrativeStaffDetail;

  @OneToOne(() => GovernmentStaffDetail, (detail) => detail.user, {
    cascade: ['insert', 'update'],
  })
  governmentStaffDetail: GovernmentStaffDetail;

  @OneToMany(() => MedicalAppointment, (appointment) => appointment.patientUser)
  appointmentsAsPatient: MedicalAppointment[];

  @OneToMany(() => AppointmentChangeHistory, (history) => history.changedByUser)
  appointmentChangesMade: AppointmentChangeHistory[];

  @OneToMany(() => ClinicalRecordEntry, (entry) => entry.patientUser)
  clinicalEntriesAsPatient: ClinicalRecordEntry[];

  @OneToMany(() => ClinicalRecordEntry, (entry) => entry.patientUser)
  clinicalEntriesAsDoctor: ClinicalRecordEntry[];

  @OneToMany(() => UserPhone, (entry) => entry.phoneNumber)
  telefonos: UserPhone[];

  @OneToMany(
    () => DoctorHealthEntityAffiliation,
    (affiliation) => affiliation.doctorUser,
  )
  affiliationsAsDoctor: DoctorHealthEntityAffiliation[];

  @OneToMany(() => DoctorScheduleTemplate, (template) => template.doctorUser)
  scheduleTemplatesAsDoctor: DoctorScheduleTemplate[];

  @OneToMany(() => AvailabilitySlot, (slot) => slot.doctorUser)
  availabilitySlotsAsDoctor: AvailabilitySlot[];

  @OneToMany(() => ScheduleBlockException, (block) => block.doctorUser)
  scheduleBlocksAsDoctor: ScheduleBlockException[];

  @OneToMany(() => SentNotificationLog, (log) => log.recipientUser)
  receivedNotifications: SentNotificationLog[];

  @OneToMany(() => GeneratedReportHistory, (report) => report.requestingUser)
  generatedReports: GeneratedReportHistory[];

  @OneToMany(() => SystemAuditLog, (log) => log.actorUser)
  auditLogs: SystemAuditLog[];
}
