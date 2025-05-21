
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
        type: 'int'
    })
    usuarioId: number;

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
        default: () => 'CURRENT_TIMESTAMP'
    })
    fechaCreacion: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    fechaActualizacion: Date;


    @ManyToOne(() => User, (user) => user.correosElectronicos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_Ref' })
    usuario: User;

   
    @BeforeInsert()
    @BeforeUpdate()
    normalizeEmail() {
        if (this.correoElectronico) {
            this.correoElectronico = this.correoElectronico.toLowerCase().trim();
        }
    }

    
    marcarComoPrincipal() {
        this.esPrincipal = true;
        return this;
    }

    desmarcarComoPrincipal() {
        this.esPrincipal = false;
        return this;
    }

    verificarCorreo() {
        this.verificado = true;
        return this;
    }

    
    static async buscarPorUsuario(usuarioId: number): Promise<UserAddress[]> {
        return this.find({ 
            where: { usuarioId },
            order: { 
                esPrincipal: 'DESC',
                verificado: 'DESC'
            }
        });
    }

    static async buscarPrincipal(usuarioId: number): Promise<UserAddress | null> {
        return await this.findOne({ 
            where: { 
                usuarioId, 
                esPrincipal: true 
            } 
        });
    }

    static async buscarPorEmail(correo: string): Promise<UserAddress | null> {
        return await this.findOne({ 
            where: { 
                correoElectronico: correo.toLowerCase().trim() 
            } 
        });
    }
}