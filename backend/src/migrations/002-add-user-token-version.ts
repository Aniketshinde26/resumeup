import type { Migration } from "./types";

const migration: Migration = {
  name: "002-add-user-token-version",
  async up({ queryInterface }) {
    const users = await queryInterface.describeTable("users");

    if (!users.tokenVersion) {
      await queryInterface.addColumn("users", "tokenVersion", {
        type: "INT",
        allowNull: false,
        defaultValue: 0,
      });
    }
  },
  async down({ queryInterface }) {
    const users = await queryInterface.describeTable("users");

    if (users.tokenVersion) {
      await queryInterface.removeColumn("users", "tokenVersion");
    }
  },
};

export default migration;
