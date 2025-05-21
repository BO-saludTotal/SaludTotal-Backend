
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
export type GenderType = 'Male' | 'Female' | 'Other' | 'PreferNotToSay';

@Entity({ name: 'PacientesDetalles' })
export class PatientDetail {
    @PrimaryColumn({ 
        name: 'PacienteUsuarioID_Ref',
        type: 'int'
    })
    patientUserId: number;

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

    getAge(): number | null {
        if (!this.birthDate) return null;
        const today = new Date();
        const birthDate = new Date(this.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
}