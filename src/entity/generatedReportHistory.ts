
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    BaseEntity
} from "typeorm";
import { ReportType } from "./reportType";
import { User } from "./user";

@Entity({ name: 'ReportesGeneradosHistorial' })
export class GeneratedReportHistory extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'ReporteGeneradoID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'TipoReporteID_Ref',
        type: 'int',
        nullable: false
    })
    reportTypeId: number;

    @Column({
        name: 'UsuarioID_Solicitante_Ref',
        type: 'int',
        nullable: true
    })
    requestedByUserId: number | null;

    @Column({
        name: 'FechaHoraGeneracion',
        type: 'datetime',
        default: () => ''
    })
    generatedAt: Date;

    @Column({
        name: 'ParametrosUtilizados',
        type: 'json',
        nullable: true
    })
    parametersUsed: Record<string, any> | null;

    @Column({
        name: 'EnlaceAlmacenamientoReporte',
        type: 'text',
        nullable: true
    })
    storageLink: string | null;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

   
    @ManyToOne(() => ReportType, (type) => type.generatedReports, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'TipoReporteID_Ref' })
    reportType: ReportType;

    @ManyToOne(() => User, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'UsuarioID_Solicitante_Ref' })
    requestedBy: User | null;

}