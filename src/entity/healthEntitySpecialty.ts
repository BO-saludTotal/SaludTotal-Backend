
import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import { HealthEntity } from "./healthEntity";
import { MedicalSpecialty } from "./medicalSpecialty";

@Entity({ name: 'EntidadSaludOfreceEspecialidades' })
export class HealthEntitySpecialty extends BaseEntity{
    @PrimaryColumn({
        name: 'EntidadSaludID_Ref',
        type: 'int'
    })
    healthEntityId: number;

    @PrimaryColumn({
        name: 'EspecialidadID_Ref',
        type: 'int'
    })
    specialtyId: number;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    
    @ManyToOne(() => HealthEntity, (entity) => entity.offeredSpecialties, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntidadSaludID_Ref' })
    healthEntity: HealthEntity;

  
    @ManyToOne(() => MedicalSpecialty, (specialty) => specialty.healthEntities, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EspecialidadID_Ref' })
    specialty: MedicalSpecialty;

   
    static async assignSpecialtyToEntity(healthEntityId: number, specialtyId: number) {
        const assignment = new HealthEntitySpecialty();
        assignment.healthEntityId = healthEntityId;
        assignment.specialtyId = specialtyId;
        await assignment.save();
        return assignment;
    }
}