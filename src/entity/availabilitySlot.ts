import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorDetail } from './doctorDetail';
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
export class AvailabilitySlot {
  @PrimaryGeneratedColumn({
    name: 'SlotID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'MedicoUsuarioID_Ref',
    type: 'int',
    nullable: false,
  })
  doctorUserId: number;

  @Column({
    name: 'EntidadSaludID_Ref',
    type: 'int',
    nullable: false,
  })
  healthEntityId: number;

  @Column({
    name: 'EspacioID_Ref',
    type: 'int',
    nullable: false,
  })
  spaceId: number;

  @Column({
    name: 'FechaHoraInicioSlot',
    type: 'datetime',
    nullable: false,
  })
  startDateTime: Date;

  @Column({
    name: 'FechaHoraFinSlot',
    type: 'datetime',
    nullable: false,
  })
  endDateTime: Date;

  @Column({
    name: 'TipoAtencionOfrecidaID_Ref',
    type: 'int',
    nullable: true,
  })
  attentionTypeId: number | null;

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

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'FechaActualizacion',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Index('IDX_DoctorSlotUnique', { unique: true })
  @Column()
  doctorSlotUnique: string;

  @Index('IDX_SpaceSlotUnique', { unique: true })
  @Column()
  spaceSlotUnique: string;

  @ManyToOne(() => DoctorDetail, (doctor) => doctor.availabilitySlots, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref' })
  doctor: DoctorDetail;

  @ManyToOne(() => HealthEntity, (entity) => entity.availabilitySlots, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EntidadSaludID_Ref' })
  healthEntity: HealthEntity;

  @ManyToOne(() => PhysicalAttentionSpace, (space) => space.availabilitySlots, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'EspacioID_Ref' })
  space: PhysicalAttentionSpace;

  @ManyToOne(() => AttentionType, (type) => type.availabilitySlots, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TipoAtencionOfrecidaID_Ref' })
  attentionType: AttentionType | null;

  @OneToMany(() => MedicalAppointment, (appointment) => appointment.slot)
  appointments: MedicalAppointment[];
}
