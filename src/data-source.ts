import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: false,
  entities: [join(__dirname, "./entities/**/*.ts")],
  subscribers: [join(__dirname, "./subscribers/**/*.ts")],
  migrations: [join(__dirname, "./migrations/**/*.ts")],
});
