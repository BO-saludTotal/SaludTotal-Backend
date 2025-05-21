
import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { User } from "./user";
import { HealthEntity } from "./healthEntity";

@Entity({ name: 'PersonalAdministrativoDetalles' })
export class AdministrativeStaffDetail {
    @PrimaryColumn({ 
        name: 'AdminUsuarioID_Ref',
        type: 'int'
    })
    adminUserId: number;

    @Column({
        name: 'CargoAdministrativo',
        type: 'varchar',
        length: 100,
        nullable: true
    })
    administrativePosition: string | null;

    @Column({
        name: 'EntidadSaludID_Asignada_Ref',
        type: 'int',
        nullable: true
    })
    assignedHealthEntityId: number | null;


    @OneToOne(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'AdminUsuarioID_Ref' })
    user: User;

    
    @ManyToOne(() => HealthEntity, (healthEntity) => healthEntity.administrativeStaff, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntidadSaludID_Asignada_Ref' })
    assignedHealthEntity: HealthEntity | null;


    assignToHealthEntity(healthEntity: HealthEntity): this {
        this.assignedHealthEntity = healthEntity;
        this.assignedHealthEntityId = healthEntity.id;
        return this;
    }

    removeFromHealthEntity(): this {
        this.assignedHealthEntity = null;
        this.assignedHealthEntityId = null;
        return this;
    }
}