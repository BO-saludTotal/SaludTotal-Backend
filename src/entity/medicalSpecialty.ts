
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
    CreateDateColumn,
    UpdateDateColumn, 
    BaseEntity
} from "typeorm";
import { DoctorSpecialtyCertification } from "./doctorSpecialtyCertification";
import { HealthEntitySpecialty } from "./healthEntitySpecialty";

@Entity({ name: 'EspecialidadesMedicasCatalogo' })
export class MedicalSpecialty extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'EspecialidadID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'NombreEspecialidad',
        type: 'varchar',
        length: 150,
        unique: true,
        nullable: false
    })
    @Index('IDX_NombreEspecialidad', { unique: true })
    name: string;

    @Column({
        name: 'DescripcionEspecialidad',
        type: 'text',
        nullable: true
    })
    description: string | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

 
    @OneToMany(() => DoctorSpecialtyCertification, (cert) => cert.specialty)
    doctorCertifications: DoctorSpecialtyCertification[];

    @OneToMany(() => HealthEntitySpecialty, (hes) => hes.specialty)
    healthEntities: HealthEntitySpecialty[];

    static async findByName(name: string): Promise<MedicalSpecialty | null> {
        return await this.findOne({ where: { name } });
    }
}