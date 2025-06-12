import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { User } from './user';
import { HealthEntity } from './healthEntity';
import { PhysicalAttentionSpace } from './physicalAttentionSpace';
import { AttentionType } from './attentionType';
import { MedicalAppointment } from './medicalAppointment';

export type SlotStatus =
  | 'Disponible'
  | 'Reservado'
  | 'Confirmado'
  | 'CanceladoMedico'
  | 'CanceladoPaciente'
  | 'Bloqueado';

@Entity({ name: 'SlotsDisponibilidadConcreta' })
@Index(['doctorUserId', 'startDateTime'], { unique: true })
@Index(['attentionSpaceId', 'startDateTime'], { unique: true })
export class AvailabilitySlot extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'SlotID', type: 'int' })
  id: number;

  @Column({
    name: 'MedicoUsuarioID_Ref',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  doctorUserId: string;

  @Column({ name: 'EntidadSaludID_Ref', type: 'int', nullable: false })
  healthEntityId: number;

  @Column({ name: 'EspacioID_Ref', type: 'int', nullable: false })
  attentionSpaceId: number;

  @Column({ name: 'FechaHoraInicioSlot', type: 'datetime', nullable: false })
  startDateTime: Date;

  @Column({ name: 'FechaHoraFinSlot', type: 'datetime', nullable: false })
  endDateTime: Date;

  @Column({ name: 'TipoAtencionOfrecidaID_Ref', type: 'int', nullable: true })
  offeredAttentionTypeId?: number | null;

  @Column({
    name: 'EstadoSlot',
    type: 'enum',
    enum: [
      'Disponible',
      'Reservado',
      'Confirmado',
      'CanceladoMedico',
      'CanceladoPaciente',
      'Bloqueado',
    ],
    default: 'Disponible',
    nullable: false,
  })
  status: SlotStatus;
/*
  @Index('IDX_DoctorSlotUnique', { unique: true })
  @Column()
  doctorSlotUnique: string;
*/
  @ManyToOne(() => User, (user) => user.availabilitySlotsAsDoctor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref', referencedColumnName: 'id' })
  doctorUser: User;

  @ManyToOne(
    () => HealthEntity,
    (healthEntity) => healthEntity.availabilitySlots,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'EntidadSaludID_Ref', referencedColumnName: 'id' })
  healthEntity: HealthEntity;

  @ManyToOne(() => PhysicalAttentionSpace, (space) => space.availabilitySlots, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EspacioID_Ref', referencedColumnName: 'id' })
  attentionSpace: PhysicalAttentionSpace;

  @ManyToOne(() => AttentionType, (type) => type.availabilitySlots, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'TipoAtencionOfrecidaID_Ref',
    referencedColumnName: 'id',
  })
  offeredAttentionType?: AttentionType | null;

  @OneToMany(() => MedicalAppointment, (appointment) => appointment.slot)
  appointments: MedicalAppointment[];
}
