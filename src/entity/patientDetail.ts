import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { MedicalAppointment } from './medicalAppointment';
import { ClinicalRecordEntry } from './clinicalRecordEntry';

export type GenderType = 'Masculino' | 'Femenino' | 'Otro' | 'PrefieroNoDecir';

@Entity({ name: 'PacientesDetalles' })
export class PatientDetail extends BaseEntity {
  @PrimaryColumn({ name: 'PacienteUsuarioID_Ref', type: 'varchar', length: 36 })
  patientUserId: string;

  @Column({ name: 'FechaNacimiento', type: 'date', nullable: true })
  birthDate?: Date | null;

  @Column({
    name: 'Genero',
    type: 'enum',
    enum: ['Masculino', 'Femenino', 'Otro', 'PrefieroNoDecir'],
    nullable: true,
  })
  gender?: GenderType | null;

  @Column({ name: 'DireccionResidencia', type: 'text', nullable: true })
  residentialAddress?: string | null;

  @Column({
    name: 'NombresCompletosPadresOTutores',
    type: 'text',
    nullable: true,
  })
  parentOrGuardianNames?: string | null;

  @OneToOne(() => User, (user) => user.patientDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'PacienteUsuarioID_Ref', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => MedicalAppointment, (appointment) => appointment.patientUser)
  appointments: MedicalAppointment[];

  @OneToMany(() => ClinicalRecordEntry, (entry) => entry.patientUser)
  clinicalRecords: ClinicalRecordEntry[];
}
