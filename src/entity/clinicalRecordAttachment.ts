
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { ClinicalRecordEntry } from "./clinicalRecordEntry";

@Entity({ name: 'EntradaHistorialDocumentosAdjuntos' })
export class ClinicalRecordAttachment extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'DocumentoAdjuntoID', type: 'int' })
    id: number;

    @Column({ name: 'EntradaHistorialID_Ref', type: 'int', nullable: false })
    clinicalRecordEntryId: number;

    @Column({ name: 'NombreArchivoOriginal', type: 'varchar', length: 255, nullable: true })
    originalFileName?: string | null;

    @Column({ name: 'TipoMIME', type: 'varchar', length: 100, nullable: true })
    mimeType?: string | null;

    @Column({ name: 'RutaAlmacenamiento', type: 'text', nullable: false })
    storagePath: string; 

    @ManyToOne(() => ClinicalRecordEntry, entry => entry.attachments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'EntradaHistorialID_Ref'})
    clinicalRecordEntry: ClinicalRecordEntry;
}