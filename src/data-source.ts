import { DataSource} from "typeorm"
import { User } from "./entity/user"
import { UsersPhone } from "./entity/users-Phone"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "kf142004",
    database: "salud",
    synchronize: true,
    logging: true,
    entities: [User, UsersPhone],
    subscribers: [],
    migrations: [],
})