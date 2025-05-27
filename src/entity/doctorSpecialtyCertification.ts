
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { DoctorDetail } from "./doctorDetail";
import { MedicalSpecialty } from "./medicalSpecialty";

@Entity({ name: 'MedicoTieneEspecialidadesCertificadas' })
export class DoctorSpecialtyCertification extends BaseEntity {
    @PrimaryColumn({ name: 'MedicoUsuarioID_Ref', type: 'varchar', length: 36 })
    doctorUserId: string;

    @PrimaryColumn({ name: 'EspecialidadID_Ref', type: 'int' })
    specialtyId: number;

    @Column({ name: 'FechaCertificacion', type: 'date', nullable: true })
    certificationDate?: Date | null;

    @ManyToOne(() => DoctorDetail, doctor => doctor.specialtyCertifications, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'MedicoUsuarioID_Ref', referencedColumnName: 'doctorUserId' }) 
    doctor: DoctorDetail;

    @ManyToOne(() => MedicalSpecialty, specialty => specialty.doctorCertifications, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'EspecialidadID_Ref', referencedColumnName: 'id' })
    specialty: MedicalSpecialty;
}