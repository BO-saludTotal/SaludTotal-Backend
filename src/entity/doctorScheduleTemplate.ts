import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { User } from './user';
import { HealthEntity } from './healthEntity';
import { PhysicalAttentionSpace } from './physicalAttentionSpace';

export type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

@Entity({ name: 'HorariosPlantillaMedico' })
export class DoctorScheduleTemplate extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'HorarioPlantillaID', type: 'int' })
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

  @Column({ name: 'EspacioID_Ref', type: 'int', nullable: true })
  attentionSpaceId?: number | null;

  @Column({
    name: 'DiaSemana',
    type: 'enum',
    enum: [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ],
    nullable: false,
  })
  dayOfWeek: DayOfWeek;

  @Column({ name: 'HoraInicio', type: 'time', nullable: false })
  startTime: string;

  @Column({ name: 'HoraFin', type: 'time', nullable: false })
  endTime: string;

  @Column({ name: 'ValidoDesde', type: 'date', nullable: false })
  validFrom: Date;

  @Column({ name: 'ValidoHasta', type: 'date', nullable: true })
  validUntil?: Date | null;

  @ManyToOne(() => User, (user) => user.scheduleTemplatesAsDoctor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'MedicoUsuarioID_Ref', referencedColumnName: 'id' })
  doctorUser: User;

  @ManyToOne(
    () => HealthEntity,
    (healthEntity) => healthEntity.scheduleTemplates,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'EntidadSaludID_Ref', referencedColumnName: 'id' })
  healthEntity: HealthEntity;

  @ManyToOne(() => PhysicalAttentionSpace, (space) => space.scheduleTemplates, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'EspacioID_Ref', referencedColumnName: 'id' })
  attentionSpace?: PhysicalAttentionSpace | null;
}
