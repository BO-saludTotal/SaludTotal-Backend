import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { DoctorSpecialtyCertification } from './doctorSpecialtyCertification';
import { HealthEntitySpecialty } from './healthEntitySpecialty';

@Entity({ name: 'EspecialidadesMedicasCatalogo' })
export class MedicalSpecialty extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'EspecialidadID', type: 'int' })
  id: number;

  @Column({
    name: 'NombreEspecialidad',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  specialtyName: string;

  @Column({ name: 'DescripcionEspecialidad', type: 'text', nullable: true })
  description?: string | null;

  @OneToMany(() => DoctorSpecialtyCertification, (cert) => cert.specialty)
  doctorCertifications: DoctorSpecialtyCertification[];

  @OneToMany(() => HealthEntitySpecialty, (hes) => hes.specialty)
  healthEntityOfferings: HealthEntitySpecialty[];
}
