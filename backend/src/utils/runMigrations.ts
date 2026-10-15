import { QueryTypes } from "sequelize";
import type { Sequelize } from "sequelize";
import { migrations } from "../migrations";

const META_TABLE = "SequelizeMeta";

export const runMigrations = async (sequelize: Sequelize): Promise<void> => {
  const queryInterface = sequelize.getQueryInterface();
  const existingTables = await queryInterface.showAllTables();
  const tableNames = new Set(existingTables.map((table) => String(table)));

  if (!tableNames.has(META_TABLE)) {
    await queryInterface.createTable(META_TABLE, {
      name: {
        type: "VARCHAR(255)",
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    });
  }

  const rows = await sequelize.query<{ name: string }>(
    "SELECT `name` FROM `SequelizeMeta`",
    { type: QueryTypes.SELECT },
  );
  const applied = new Set(rows.map((row) => row.name));

  const pending = [...migrations]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((migration) => !applied.has(migration.name));

  if (pending.length === 0) {
    return;
  }

  for (const migration of pending) {
    await migration.up({ sequelize, queryInterface });
    await sequelize.query("INSERT INTO `SequelizeMeta` (`name`) VALUES (?)", {
      replacements: [migration.name],
    });
    console.log(`Migration applied: ${migration.name}`);
  }
};
