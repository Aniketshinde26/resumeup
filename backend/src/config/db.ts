import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 4000,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? {
        require: true,
        rejectUnauthorized: true,
      } : undefined,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};
