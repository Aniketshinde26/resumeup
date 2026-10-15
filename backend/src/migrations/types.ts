import type { QueryInterface, Sequelize } from "sequelize";

export interface MigrationContext {
  sequelize: Sequelize;
  queryInterface: QueryInterface;
}

export interface Migration {
  name: string;
  up: (ctx: MigrationContext) => Promise<void>;
  down: (ctx: MigrationContext) => Promise<void>;
}
