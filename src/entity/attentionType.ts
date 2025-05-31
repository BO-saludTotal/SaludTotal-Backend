import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { AvailabilitySlot } from './availabilitySlot';

@Entity({ name: 'TiposAtencionCatalogo' })
export class AttentionType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'TipoAtencionID', type: 'int' })
  id: number;

  @Column({
    name: 'NombreTipoAtencion',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  attentionTypeName: string;

  @Column({ name: 'DuracionEstimadaMinutos', type: 'int', nullable: true })
  estimatedDurationMinutes?: number | null;

  @OneToMany(() => AvailabilitySlot, (slot) => slot.offeredAttentionType)
  availabilitySlots: AvailabilitySlot[];


}
