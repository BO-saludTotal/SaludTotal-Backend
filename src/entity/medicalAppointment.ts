
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { AvailabilitySlot } from "./availabilitySlot";
import { PatientDetail } from "./patientDetails";
import { AttentionType } from "./attentionType";

export type AppointmentStatus = 
    'Solicitada' | 
    'Confirmada' | 
    'Modificada' | 
    'CanceladaPorPaciente' | 
    'CanceladaPorMedico' | 
    'Realizada' | 
    'NoAsistio';

@Entity({ name: 'CitasMedicas' })
export class MedicalAppointment {
    @PrimaryGeneratedColumn({
        name: 'CitaID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'SlotID_Ref',
        type: 'int',
        unique: true,
        nullable: false
    })
    slotId: number;

    @Column({
        name: 'PacienteUsuarioID_Ref',
        type: 'int',
        nullable: false
    })
    patientUserId: number;

    @CreateDateColumn({
        name: 'FechaHoraSolicitudCita',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    requestDateTime: Date;

    @Column({
        name: 'EstadoCita',
        type: 'enum',
        enum: [
            'Solicitada', 
            'Confirmada', 
            'Modificada', 
            'CanceladaPorPaciente', 
            'CanceladaPorMedico', 
            'Realizada', 
            'NoAsistio'
        ],
        nullable: false
    })
    status: AppointmentStatus;

    @Column({
        name: 'MotivoConsultaPaciente',
        type: 'text',
        nullable: true
    })
    patientReason: string | null;

  
    @ManyToOne(() => AvailabilitySlot, (slot) => slot.appointment, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'SlotID_Ref' })
    slot: AvailabilitySlot;

    @ManyToOne(() => AttentionType, (attentionType) => attentionType.appointments, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'TipoAtencionID_Ref' })
    attentionType: AttentionType;

    @ManyToOne(() => PatientDetail, (patient) => patient.appointments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'PacienteUsuarioID_Ref' })
    patient: PatientDetail;

   
    confirm(): this {
        this.status = 'Confirmada';
        return this;
    }

    cancelByPatient(reason?: string): this {
        this.status = 'CanceladaPorPaciente';
        if (reason) this.patientReason = reason;
        return this;
    }

    complete(): this {
        this.status = 'Realizada';
        return this;
    }
}