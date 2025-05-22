import {Entity , Column, PrimaryGeneratedColumn, CreateDateColumn, Index, BeforeInsert, BeforeUpdate, BeforeRemove, BaseEntity, OneToMany, 
    ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid'; //por si necesitamos usar esto para los caarnets
import { UsersPhone } from "./users-Phone";
import { UserAddress } from "./userAdress";
import { Role } from "./role";
import { PatientDetail } from "./patientDetails";
import { UserAssignedRole } from "./userAssignedRole";
import { DoctorDetail } from "./doctorDetail";
import { AdministrativeStaffDetail } from "./administrativeStaffDetail";
import { GovernmentStaffDetail } from "./governmentStaffDetail";
export type EstadoCuentaType = 'Activo' | 'Inactivo' | 'Bloqueado' | 'Verificacion pendiente';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'UsuarioID' })
    id: number;

    @Column({
        name: 'NombreUsuario',
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    @Index('IDX_NombreUsuario', { unique: true }) //busqueda rapida de usuario
    nombreUsuario: string;

    @Column({
        name: 'ContrasenaHash',
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false 
    })
    contrasenaHash: string;

    @Column({
        name: 'NombreCompleto',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    nombreCompleto: string;

    @CreateDateColumn({
        name: 'FechaRegistro',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fechaRegistro: Date;

    @Column({
        name: 'EstadoCuenta',
        type: 'enum',
        enum: ['Activo', 'Inactivo', 'Bloqueado', 'PendienteVerificacion'],
        default: 'PendienteVerificacion',
        nullable: false
    })
    estadoCuenta: EstadoCuentaType;

    @Column({
        name: 'UltimoAcceso',
        type: 'datetime',
        nullable: true
    })
    ultimoAcceso: Date | null;

    @OneToMany(() => UsersPhone, (phone) => phone.usuario)
    telefonos: UsersPhone[];
    
    @OneToMany(() => UserAddress, (email) => email.usuario)
    correosElectronicos: UserAddress[];

     @ManyToOne(() => Role, (role) => role.users, {
        onDelete: 'SET NULL', 
        eager: true 
    })
    @JoinColumn({ name: 'RolID' }) 
    role: Role;

    
    @OneToMany(() => UserAssignedRole, (assignment) => assignment.user)
    assignedRoles: UserAssignedRole[];

    
    @OneToOne(() => PatientDetail, (detail) => detail.user, {
        cascade: true
    })
    patientDetail: PatientDetail;

    @OneToOne(() => DoctorDetail, (detail) => detail.user, {
        cascade: true
    })
    doctorDetail: DoctorDetail;

    @ManyToOne(() => AdministrativeStaffDetail, (detail) => detail.user, {
        cascade: true
    })
    administrativeStaffDetail: AdministrativeStaffDetail;

    @OneToOne(() => GovernmentStaffDetail, (detail) => detail.user, {
        cascade: true
    })
    governmentStaffDetail: GovernmentStaffDetail;

    @BeforeInsert()
    @BeforeUpdate()
    normalizeUsername() {
        this.nombreUsuario = this.nombreUsuario.toLowerCase().trim();
    }
    	//para encadenamiento osea consultas seguidas retornar el this
    
    marcarComoActivo() {
        this.estadoCuenta = 'Activo';
        return this;
    }

    bloquearCuenta() {
        this.estadoCuenta = 'Bloqueado';
        return this;
    }

    marcarComoInactivo() {
        this.estadoCuenta = "Inactivo";
        return this;
    }

    registrarAcceso() {
        this.ultimoAcceso = new Date();
        return this;
    }
    static async usuariosActivos(): Promise<User[]> {
        return this.find({ where: { estadoCuenta: 'Activo' } });
    }
}
