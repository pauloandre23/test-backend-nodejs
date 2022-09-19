import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "../../domain/entities/Product"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "somemongo",
    username: "paulofilho",
    password: "chama123",
    synchronize: true,
    logging: ['query', 'error'],
    entities: [Product],
    migrations: [],
    subscribers: [],
})