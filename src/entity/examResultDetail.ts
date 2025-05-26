import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ExamResult } from './examResult';
import { ExamParameter } from './examParameter';

@Entity({ name: 'ResultadoExamenDetalleParametros' })
export class ExamResultDetail {
  @PrimaryGeneratedColumn({
    name: 'ResultadoExamenDetalleID',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'ResultadoExamenID_Ref',
    type: 'int',
    nullable: false,
  })
  examResultId: number;

  @Column({
    name: 'ParametroExamenID_Ref',
    type: 'int',
    nullable: false,
  })
  parameterId: number;

  @Column({
    name: 'ValorObtenido',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  value: string;

  @CreateDateColumn({
    name: 'FechaCreacion',
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => ExamResult, (exam) => exam.parameters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ResultadoExamenID_Ref' })
  examResult: ExamResult;

  @ManyToOne(() => ExamParameter, (param) => param.examResults, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ParametroExamenID_Ref' })
  parameter: ExamParameter;
}
