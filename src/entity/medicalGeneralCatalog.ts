
import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    Index 
} from "typeorm";

@Entity({ name: "MedicamentosCatalogoGeneral" })
@Index(["activeIngredient", "pharmaceuticalForm", "concentration"], { unique: true })
export class MedicalGeneralCatalog {
    @PrimaryGeneratedColumn({ name: "MedicamentoGeneralID" })
    medicalGeneralId: number;

    @Column({ name: "PrincipioActivo", type: "varchar", length: 255 })
    activeIngredient: string;

    @Column({ name: "FormaFarmaceutica", type: "varchar", length: 100 })
    pharmaceuticalForm: string;

    @Column({ name: "Concentracion", type: "varchar", length: 100 })
    concentration: string;
}
