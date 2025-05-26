import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  Index,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersPhone } from './users-Phone';
import { UserAddress } from './userAdress';
import { Role } from './role';
import { PatientDetail } from './patientDetails';
import { UserAssignedRole } from './userAssignedRole';
import { DoctorDetail } from './doctorDetail';
import { AdministrativeStaffDetail } from './administrativeStaffDetail';
import { GovernmentStaffDetail } from './governmentStaffDetail';
import { SentNotificationLog } from './sentNotificationLog';
import { GeneratedReportHistory } from './generatedReportHistory';
import { SystemAuditLog } from './systemAuditLog';

export type EstadoCuentaType =
  | 'Activo'
  | 'Inactivo'
  | 'Bloqueado'
  | 'Verificacion pendiente';
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'UsuarioID' })
  id: string = uuidv4();

  @Column({
    name: 'NombreUsuario',
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  @Index('IDX_NombreUsuario', { unique: true })
  nombreUsuario: string;

  @Column({
    name: 'ContrasenaHash',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  contrasenaHash: string;

  @Column({
    name: 'NombreCompleto',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  nombreCompleto: string;

  @CreateDateColumn({
    name: 'FechaRegistro',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date;

  @Column({
    name: 'EstadoCuenta',
    type: 'enum',
    enum: ['Activo', 'Inactivo', 'Bloqueado', 'PendienteVerificacion'],
    default: 'PendienteVerificacion',
    nullable: false,
  })
  estadoCuenta: EstadoCuentaType;

  @Column({
    name: 'UltimoAcceso',
    type: 'datetime',
    nullable: true,
  })
  ultimoAcceso: Date | null;

  @OneToMany(() => UsersPhone, (phone) => phone.usuario)
  telefonos: UsersPhone[];

  @OneToMany(() => UserAddress, (email) => email.usuario)
  correosElectronicos: UserAddress[];

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'RolID' })
  role: Role;

  @OneToMany(() => UserAssignedRole, (assignment) => assignment.user)
  assignedRoles: UserAssignedRole[];

  @OneToOne(() => PatientDetail, (detail) => detail.user, {
    cascade: true,
  })
  patientDetail: PatientDetail;

  @OneToOne(() => DoctorDetail, (detail) => detail.user, {
    cascade: true,
  })
  doctorDetail: DoctorDetail;

  @ManyToOne(() => AdministrativeStaffDetail, (detail) => detail.user, {
    cascade: true,
  })
  administrativeStaffDetail: AdministrativeStaffDetail;

  @OneToOne(() => GovernmentStaffDetail, (detail) => detail.user, {
    cascade: true,
  })
  governmentStaffDetail: GovernmentStaffDetail;

  @OneToMany(
    () => SentNotificationLog,
    (notification) => notification.recipient,
  )
  receivedNotifications: SentNotificationLog[];

  @OneToMany(() => GeneratedReportHistory, (report) => report.requestedBy)
  generatedReports: GeneratedReportHistory[];

  @OneToMany(() => SystemAuditLog, (log) => log.actor)
  auditLogs: SystemAuditLog[];
}
