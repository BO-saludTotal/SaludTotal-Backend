import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { ReportType } from './reportType';
import { User } from './user';

@Entity({ name: 'ReportesGeneradosHistorial' })
export class GeneratedReportHistory extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ReporteGeneradoID', type: 'int' })
  id: number;

  @Column({ name: 'TipoReporteID_Ref', type: 'int', nullable: false })
  reportTypeId: number;

  @Column({
    name: 'UsuarioID_Solicitante_Ref',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  requestingUserId?: string | null;

  @CreateDateColumn({ name: 'FechaHoraGeneracion', type: 'datetime' })
  generationDateTime: Date;

  @Column({ name: 'ParametrosUtilizados', type: 'json', nullable: true })
  parametersUsed?: any;

  @Column({ name: 'EnlaceAlmacenamientoReporte', type: 'text', nullable: true })
  reportStorageLink?: string | null;

  @ManyToOne(() => ReportType, (type) => type.generatedReports, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'TipoReporteID_Ref', referencedColumnName: 'id' })
  reportType: ReportType;

  @ManyToOne(() => User, (user) => user.generatedReports, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'UsuarioID_Solicitante_Ref', referencedColumnName: 'id' })
  requestingUser?: User | null;
}
