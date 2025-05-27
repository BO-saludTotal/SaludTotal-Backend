
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { User } from "./user";

export type PhoneType = 'Móvil' | 'Casa' | 'Trabajo';

@Entity({ name: 'TelefonosUsuario' })
export class UserPhone extends BaseEntity {
    @PrimaryColumn({ name: 'UsuarioID_Ref', type: 'varchar', length: 36 })
    userId: string;

    @PrimaryColumn({ name: 'NumeroTelefono', type: 'varchar', length: 25 })
    phoneNumber: string;

    @Column({
        name: 'TipoTelefono',
        type: 'enum',
        enum: ['Móvil', 'Casa', 'Trabajo'],
        nullable: true
    })
    phoneType?: PhoneType;

    @Column({ name: 'EsPrincipal', type: 'boolean', default: false })
    isPrimary: boolean;

    @ManyToOne(() => User, (user) => user.phones, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'UsuarioID_Ref', referencedColumnName: 'id' })
    user: User;
}