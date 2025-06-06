import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { MedicalAppointment } from './medicalAppointment';
import { User } from './user';

@Entity({ name: 'HistorialCambiosCita' })
export class AppointmentChangeHistory extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'CambioCitaID', type: 'int' })
  id: number;

  @Column({ name: 'CitaID_Ref', type: 'int', nullable: false })
  appointmentId: number;

  @CreateDateColumn({ name: 'FechaHoraCambio', type: 'datetime' })
  changeDateTime: Date;

  @Column({
    name: 'UsuarioID_RealizaCambio_Ref',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  changedByUserId?: string | null;

  @Column({
    name: 'EstadoAnterior',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  previousStatus?: string | null;

  @Column({ name: 'EstadoNuevo', type: 'varchar', length: 50, nullable: true })
  newStatus?: string | null;

  @Column({ name: 'MotivoCambioCancelacion', type: 'text', nullable: true })
  reasonForChangeOrCancellation?: string | null;

  @ManyToOne(
    () => MedicalAppointment,
    (appointment) => appointment.changeHistory,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'CitaID_Ref', referencedColumnName: 'id' })
  appointment: MedicalAppointment;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'UsuarioID_RealizaCambio_Ref',
    referencedColumnName: 'id',
  })
  changedByUser?: User | null;
}
