import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { User } from "./user";

@Entity({ name: 'CorreosElectronicosUsuario' })
export class UserEmail extends BaseEntity {
    @PrimaryColumn({ name: 'UsuarioID_Ref', type: 'varchar', length: 36 })
    userId: string;

    @PrimaryColumn({ name: 'CorreoElectronico', type: 'varchar', length: 255 })
    emailAddress: string;

    @Column({ name: 'EsPrincipal', type: 'boolean', default: false })
    isPrimary: boolean;

    @Column({ name: 'Verificado', type: 'boolean', default: false })
    isVerified: boolean;

    @ManyToOne(() => User, (user) => user.emails, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'UsuarioID_Ref', referencedColumnName: 'id' })
    user: User;
}