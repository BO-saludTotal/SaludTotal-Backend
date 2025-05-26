import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { MedicalAppointment } from "src/entity/medicalAppointment";

@Injectable()
export class MedicalAppointmentRepository extends Repository<MedicalAppointment>{
    constructor(private dataSource: DataSource){
        super(MedicalAppointment, dataSource.createEntityManager());
    }

    async createMedicalAppointment(medA: MedicalAppointment): Promise<MedicalAppointment> {
        return this.save(medA); 
    }

    async getAllMedicAppointment(){
        return this.dataSource.getRepository(MedicalAppointment).find();
    }

    async getMedicAppointmentByID(id: number){
        return this.dataSource.getRepository(MedicalAppointment).findOneBy({id:id})
    }
    async deleteMedicalAppointment(id: number){
        return this.dataSource.getRepository(MedicalAppointment).delete({id:id});
    }
}