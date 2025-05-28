import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { ExamResult } from './examResult';
import { ExamParameter } from './examParameter';

@Entity({ name: 'ResultadoExamenDetalleParametros' })
export class ExamResultDetail extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ResultadoExamenDetalleID', type: 'int' })
  id: number;

  @Column({ name: 'ResultadoExamenID_Ref', type: 'int', nullable: false })
  examResultId: number;

  @Column({ name: 'ParametroExamenID_Ref', type: 'int', nullable: false })
  examParameterId: number;

  @Column({
    name: 'ValorObtenido',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  obtainedValue: string;

  @ManyToOne(() => ExamResult, (er) => er.parameterDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ResultadoExamenID_Ref', referencedColumnName: 'id' })
  examResult: ExamResult;

  @ManyToOne(() => ExamParameter, (ep) => ep.examResultDetails, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ParametroExamenID_Ref', referencedColumnName: 'id' })
  examParameter: ExamParameter;
}
