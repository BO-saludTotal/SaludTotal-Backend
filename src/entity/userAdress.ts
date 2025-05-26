
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    BaseEntity
} from "typeorm";
import { User } from "./user"; 

@Entity({ name: 'CorreosElectronicosUsuario' }) 
export class UserAddress extends BaseEntity{
    @PrimaryColumn({
        name: 'UsuarioID_Ref',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    usuarioId: string;

    @PrimaryColumn({
        name: 'CorreoElectronico',
        type: 'varchar',
        length: 255
    })
    correoElectronico: string;

    @Column({
        name: 'EsPrincipal',
        type: 'boolean',
        default: false
    })
    esPrincipal: boolean;

    @Column({
        name: 'Verificado',
        type: 'boolean',
        default: false
    })
    verificado: boolean;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp',
    })
    fechaCreacion: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp',
    })
    fechaActualizacion: Date;


    @ManyToOne(() => User, (user) => user.correosElectronicos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_Ref' })
    usuario: User;

}