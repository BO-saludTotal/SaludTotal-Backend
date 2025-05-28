import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ExamResultDetail } from './examResultDetail';

@Entity({ name: 'ParametrosExamenCatalogo' })
export class ExamParameter extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ParametroExamenID', type: 'int' })
  id: number;

  @Column({
    name: 'NombreParametro',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  parameterName: string;

  @Column({
    name: 'UnidadMedidaDefault',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  defaultUnitOfMeasure?: string | null;

  @OneToMany(() => ExamResultDetail, (detail) => detail.examParameter)
  examResultDetails: ExamResultDetail[];
}
