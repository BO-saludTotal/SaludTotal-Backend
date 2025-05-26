
import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { User } from "./user";
import { MedicalAppointment } from "./medicalAppointment";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";

export type GenderType = 'Male' | 'Female' | 'Other' | 'PreferNotToSay';

@Entity({ name: 'PacientesDetalles' })
export class PatientDetail {
    @PrimaryColumn({ 
        name: 'PacienteUsuarioID_Ref',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    patientUserId: string;

    @Column({
        name: 'FechaNacimiento',
        type: 'date',
        nullable: true
    })
    birthDate: Date | null;

    @Column({
        name: 'Genero',
        type: 'enum',
        enum: ['Male', 'Female', 'Other', 'PreferNotToSay'],
        nullable: true,
        comment: 'Gender identity of the patient'
    })
    gender: GenderType | null;

    @Column({
        name: 'DireccionResidencia',
        type: 'text',
        nullable: true
    })
    address: string | null;

    @Column({
        name: 'NombresCompletosPadresOTutores',
        type: 'text',
        nullable: true
    })
    parentsOrGuardians: string | null;

    
    @OneToOne(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'PacienteUsuarioID_Ref' })
    user: User;

    @OneToMany(() => MedicalAppointment, (appointment) => appointment.patient)
    appointments: MedicalAppointment[];

    @OneToMany(() => ClinicalRecordEntry, (record) => record.patient)
    clinicalRecords: ClinicalRecordEntry[];

}