
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
} from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";

@Entity({ name: 'EntradaHistorialDocumentosAdjuntos' })
export class ClinicalRecordAttachment {
    @PrimaryGeneratedColumn({
        name: 'DocumentoAdjuntoID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'EntradaHistorialID_Ref',
        type: 'int',
        nullable: false
    })
    recordEntryId: number;

    @Column({
        name: 'NombreArchivoOriginal',
        type: 'varchar',
        length: 255,
        nullable: true
    })
    originalFilename: string | null;

    @Column({
        name: 'TipoMIME',
        type: 'varchar',
        length: 100,
        nullable: true
    })
    mimeType: string | null;

    @Column({
        name: 'RutaAlmacenamiento',
        type: 'text',
        nullable: false
    })
    storagePath: string;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

    
    @ManyToOne(() => ClinicalRecordEntry, (entry) => entry.attachments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'EntradaHistorialID_Ref' })
    recordEntry: ClinicalRecordEntry;

    
    getPublicUrl(): string {
        return `${process.env.STORAGE_BASE_URL}/${this.storagePath}`;
    }
}