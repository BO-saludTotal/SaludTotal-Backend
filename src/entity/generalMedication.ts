
import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, OneToMany } from "typeorm";
import { CommercialMedicationPresentation } from "./commercialMedicationPresentation";

@Entity({ name: 'MedicamentosCatalogoGeneral' })
@Index(["activeIngredient", "pharmaceuticalForm", "concentration"], { unique: true })
export class GeneralMedication extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MedicamentoGeneralID', type: 'int' })
    id: number;

    @Column({ name: 'PrincipioActivo', type: 'varchar', length: 255, nullable: false })
    activeIngredient: string;

    @Column({ name: 'FormaFarmaceutica', type: 'varchar', length: 100, nullable: false })
    pharmaceuticalForm: string;

    @Column({ name: 'Concentracion', type: 'varchar', length: 100, nullable: false })
    concentration: string;

    @OneToMany(() => CommercialMedicationPresentation, presentation => presentation.generalMedication)
    commercialPresentations: CommercialMedicationPresentation[];
}