import { DataSource } from "typeorm";
import dotenv from "dotenv"
import { Registration } from "../entities/register";

dotenv.config();

const databaseconnection = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging:true,
  entities: [Registration],
  migrations: [],
})

export default databaseconnection;