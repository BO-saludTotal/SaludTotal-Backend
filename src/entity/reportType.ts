import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { GeneratedReportHistory } from './generatedReportHistory';

@Entity({ name: 'TiposReporteCatalogo' })
export class ReportType extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'TipoReporteID', type: 'int' })
  id: number;

  @Column({
    name: 'NombreTipoReporte',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  reportTypeName: string;

  @OneToMany(() => GeneratedReportHistory, (history) => history.reportType)
  generatedReports: GeneratedReportHistory[];
}
