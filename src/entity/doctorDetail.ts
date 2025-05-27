
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, Index, BaseEntity, OneToMany } from "typeorm";
import { User } from "./user";
import { DoctorSpecialtyCertification } from "./doctorSpecialtyCertification";


@Entity({ name: 'MedicosDetalles' })
export class DoctorDetail extends BaseEntity {
    @PrimaryColumn({ name: 'MedicoUsuarioID_Ref', type: 'varchar', length: 36 })
    doctorUserId: string; 

    @Column({ name: 'NumeroColegiado', type: 'varchar', length: 50, unique: true, nullable: false })
    @Index('IDX_MedicosDetalles_NumeroColegiadoUnico', { unique: true })
    medicalLicenseNumber: string;

    @OneToOne(() => User, user => user.doctorDetail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'MedicoUsuarioID_Ref', referencedColumnName: 'id' }) 
    user: User;

    @OneToMany(() => DoctorSpecialtyCertification, cert => cert.doctor) 
    specialtyCertifications: DoctorSpecialtyCertification[];
}