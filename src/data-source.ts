import { DataSource, DataSourceOptions} from "typeorm"
import { User } from "./entity/user"
import { UsersPhone } from "./entity/users-Phone"
import { MedicalAppointment } from "./entity/medicalAppointment"

export const dataSourceOptions:DataSourceOptions =({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "kf142004",
    database: "salud",
    synchronize: true,
    logging: true,
    entities: [User, UsersPhone, MedicalAppointment],
    subscribers: [],
    migrations: [],
})

export const AppDataSource = new DataSource(dataSourceOptions);