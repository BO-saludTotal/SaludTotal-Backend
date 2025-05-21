
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity
} from "typeorm";
import { User } from "./user";
import { UserAssignedRole } from "./UserAssignedRole";
@Entity({ name: 'RolesCatalogo' }) 
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'RolID',
        type: 'int',
        comment: 'Identificador único del rol'
    })
    id: number;

    @Column({
        name: 'NombreRol',
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    @Index('IDX_NombreRol', { unique: true })
    name: string;

    @Column({
        name: 'DescripcionRol',
        type: 'text',
        nullable: true,
        comment: 'Descripción detallada del rol y sus permisos'
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

    
    @OneToMany(() => User, (user) => user.role)
    users: User[];

    @OneToMany(() => UserAssignedRole, (assignment) => assignment.role)
    userAssignments: UserAssignedRole[];
   
    updateDescription(newDescription: string): this {
        this.description = newDescription;
        return this;
    }

   
    static async findByName(roleName: string): Promise<Role | null> {
        return await this.findOne({ where: { name: roleName } });
    }

    static async getRolesWithUsers(): Promise<Role[]> {
        return await this.find({
            relations: ['users'],
            order: { name: 'ASC' }
        });
    }
}