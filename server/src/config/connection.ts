// server/src/config/connection.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST!,             // ← non‐null assertion
    port: parseInt(process.env.DB_PORT!, 10),
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
