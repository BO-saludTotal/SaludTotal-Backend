
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { DoctorDetail } from "./doctorDetail";
import { MedicalSpecialty } from "./medicalSpecialty";

@Entity({ name: 'MedicoTieneEspecialidadesCertificadas' })
export class DoctorSpecialtyCertification {
    @PrimaryColumn({
        name: 'MedicoUsuarioID_Ref',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    doctorUserId: string;

    @PrimaryColumn({
        name: 'EspecialidadID_Ref',
        type: 'int'
    })
    specialtyId: number;

    @Column({
        name: 'FechaCertificacion',
        type: 'date',
        nullable: true
    })
    certificationDate: Date | null;


    @ManyToOne(() => DoctorDetail, (doctor) => doctor.specialtyCertifications)
    @JoinColumn({ name: 'MedicoUsuarioID_Ref' })
    doctor: DoctorDetail;

   
    @ManyToOne(() => MedicalSpecialty, (specialty) => specialty.doctorCertifications)
    @JoinColumn({ name: 'EspecialidadID_Ref' })
    specialty: MedicalSpecialty;

}