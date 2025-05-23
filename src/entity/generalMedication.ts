
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany
} from "typeorm";


import { CommercialMedicationPresentation } from "./commercialMedicationPresentation";
@Entity({ name: 'MedicamentosCatalogoGeneral' })
export class GeneralMedication extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'MedicamentoGeneralID',
        type: 'int'
    })
    id: number;

    @Column({
        name: 'PrincipioActivo',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    activeIngredient: string;

    @Column({
        name: 'FormaFarmaceutica',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    pharmaceuticalForm: string;

    @Column({
        name: 'Concentracion',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    concentration: string;

    @CreateDateColumn({
        name: 'FechaCreacion',
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'FechaActualizacion',
        type: 'timestamp'
    })
    updatedAt: Date;

    
    @Index('IDX_MedicationUnique', { unique: true })
    @Column()
    medicationUnique: string;

    @OneToMany(() => CommercialMedicationPresentation, (presentation) => presentation.generalMedication)
    commercialPresentations: CommercialMedicationPresentation[];

    getFullDescription(): string {
        return `${this.activeIngredient} ${this.concentration} (${this.pharmaceuticalForm})`;
    }

    static async findOrCreate(
        activeIngredient: string,
        pharmaceuticalForm: string,
        concentration: string
    ): Promise<GeneralMedication> {
        let med = await this.findOne({ 
            where: { 
                activeIngredient, 
                pharmaceuticalForm, 
                concentration 
            } 
        });
        
        if (!med) {
            med = new GeneralMedication();
            med.activeIngredient = activeIngredient;
            med.pharmaceuticalForm = pharmaceuticalForm;
            med.concentration = concentration;
            await med.save();
        }
        
        return med;
    }
}