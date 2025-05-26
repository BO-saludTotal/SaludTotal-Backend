import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { ScheduleBlockException } from './scheduleBlockException';
import { DoctorSpecialtyCertification } from './doctorSpecialtyCertification';
import { DoctorScheduleTemplate } from './doctorScheduleTemplate';
import { AvailabilitySlot } from './availabilitySlot';
import { DoctorHealthEntityAffiliation } from './doctorHealthEntityAffiliation';
import { ClinicalRecordEntry } from './clinicalRecordEntry';

@Entity({ name: 'MedicosDetalles' })
export class DoctorDetail {
  @PrimaryColumn({
    name: 'MedicoUsuarioID_Ref',
    type: 'int',
  })
  doctorUserId: number;

  @Column({
    name: 'NumeroColegiado',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  @Index('IDX_NumeroColegiado', { unique: true })
  medicalLicenseNumber: string;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref' })
  user: User;

  @OneToMany(() => DoctorSpecialtyCertification, (cert) => cert.doctor)
  specialtyCertifications: DoctorSpecialtyCertification[];

  @OneToMany(() => ScheduleBlockException, (block) => block.doctor)
  scheduleBlocks: ScheduleBlockException[];

  @OneToMany(() => DoctorScheduleTemplate, (template) => template.doctor)
  scheduleTemplates: DoctorScheduleTemplate[];

  @OneToMany(() => AvailabilitySlot, (slot) => slot.doctor)
  availabilitySlots: AvailabilitySlot[];

  @OneToMany(
    () => DoctorHealthEntityAffiliation,
    (affiliation) => affiliation.doctor,
  )
  healthEntityAffiliations: DoctorHealthEntityAffiliation[];

  @OneToMany(() => ClinicalRecordEntry, (record) => record.doctor)
  clinicalRecords: ClinicalRecordEntry[];
}
