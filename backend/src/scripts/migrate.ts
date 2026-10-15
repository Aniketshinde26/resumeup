import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "../config/db";
import { runMigrations } from "../utils/runMigrations";

const main = async () => {
  await sequelize.authenticate();
  await runMigrations(sequelize);
  await sequelize.close();
  console.log("Migrations complete.");
};

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
