import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { User } from './user';

@Entity({ name: 'BloqueosExcepcionesHorario' })
export class ScheduleBlockException extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'BloqueoID', type: 'int' })
  id: number;

  @Column({
    name: 'MedicoUsuarioID_Ref',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  doctorUserId: string;

  @Column({ name: 'FechaHoraInicioBloqueo', type: 'datetime', nullable: false })
  startDateTime: Date;

  @Column({ name: 'FechaHoraFinBloqueo', type: 'datetime', nullable: false })
  endDateTime: Date;

  @Column({ name: 'MotivoBloqueo', type: 'text', nullable: true })
  reason?: string | null;

  @ManyToOne(() => User, (user) => user.scheduleBlocksAsDoctor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref', referencedColumnName: 'id' })
  doctorUser: User;
}
