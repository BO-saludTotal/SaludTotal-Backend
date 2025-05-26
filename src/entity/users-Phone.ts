import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { User } from "./user"; 

export type TipoTelefonoType = 'Móvil' | 'Casa' | 'Trabajo';

@Entity({ name: 'TelefonosUsuario' })
export class UsersPhone extends BaseEntity {
    @PrimaryColumn({ name: 'UsuarioID_Ref', type: 'int' })
    usuarioId: number;

    @PrimaryColumn({ name: 'NumeroTelefono', type: 'varchar', length: 25 })
    numeroTelefono: string;

    @Column({
        name: 'TipoTelefono',
        type: 'enum',
        enum: ['Móvil', 'Casa', 'Trabajo'],
        nullable: true
    })
    tipoTelefono?: TipoTelefonoType;

    @Column({ name: 'EsPrincipal', type: 'boolean', default: false })
    esPrincipal: boolean;



    @ManyToOne(() => User, (user) => user.telefonos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_Ref' })
    usuario: User;
}