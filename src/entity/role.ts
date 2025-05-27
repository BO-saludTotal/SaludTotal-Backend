
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { UserAssignedRole } from "./userAssignedRole";

@Entity({ name: 'RolesCatalogo' })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'RolID', type: 'int' })
    id: number;

    @Column({ name: 'NombreRol', type: 'varchar', length: 50, unique: true, nullable: false })
    name: string;

    @Column({ name: 'DescripcionRol', type: 'text', nullable: true })
    description?: string | null;

    @OneToMany(() => UserAssignedRole, (assignment) => assignment.role)
    userAssignments: UserAssignedRole[];
}