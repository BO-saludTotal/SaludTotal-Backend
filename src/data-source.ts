import { DataSource, DataSourceOptions} from "typeorm"
import { User } from "./entity/user"
import { UsersPhone } from "./entity/users-Phone"
import { MedicalAppointment } from "./entity/medicalAppointment"
import { AvailabilitySlot } from "./entity/availabilitySlot"
import { PatientDetail } from "./entity/patientDetails";
import { AttentionType } from "./entity/attentionType";
import { AppointmentChangeHistory } from "./entity/appointmentChangeHistory";
import { ClinicalRecordEntry } from "./entity/clinicalRecordEntry";
import { DoctorDetail } from "./entity/doctorDetail"
import { DoctorSpecialtyCertification } from "./entity/doctorSpecialtyCertification"

export const dataSourceOptions:DataSourceOptions =({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "kf142004",
    database: "salud",
    synchronize: true,
    logging: true,
    entities: [MedicalAppointment, User, UsersPhone, AvailabilitySlot, PatientDetail, AttentionType, AppointmentChangeHistory,
        DoctorDetail, MedicalAppointment, DoctorSpecialtyCertification, ClinicalRecordEntry
    ],
    subscribers: [],
    migrations: [],
})

export const AppDataSource = new DataSource(dataSourceOptions);