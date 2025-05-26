import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { GeneratedReportHistory } from './generatedReportHistory';

@Entity({ name: 'TiposReporteCatalogo' })
export class ReportType extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'TipoReporteID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'NombreTipoReporte',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  @Index('IDX_NombreTipoReporte', { unique: true })
  name: string;

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

  @OneToMany(() => GeneratedReportHistory, (report) => report.reportType)
  generatedReports: GeneratedReportHistory[];
}
