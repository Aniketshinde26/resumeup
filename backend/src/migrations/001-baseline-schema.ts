import type { Migration } from "./types";

const usersTable = {
  id: {
    type: "INT",
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  fullname: { type: "VARCHAR(255)", allowNull: false },
  email: { type: "VARCHAR(255)", allowNull: false, unique: true },
  password: { type: "VARCHAR(255)", allowNull: true },
  refreshToken: { type: "VARCHAR(255)", allowNull: true },
  googleId: { type: "VARCHAR(255)", allowNull: true, unique: true },
  githubId: { type: "VARCHAR(255)", allowNull: true, unique: true },
  resetPasswordToken: { type: "VARCHAR(255)", allowNull: true },
  resetPasswordExpires: { type: "DATETIME", allowNull: true },
  resetPasswordRequestedAt: { type: "DATETIME", allowNull: true },
  failedLoginAttempts: { type: "INT", allowNull: false, defaultValue: 0 },
  lockedUntil: { type: "DATETIME", allowNull: true },
  passwordChangedAt: { type: "DATETIME", allowNull: true },
  createdAt: { type: "DATETIME", allowNull: false },
  updatedAt: { type: "DATETIME", allowNull: false },
};

const resumesTable = {
  id: {
    type: "INT",
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { type: "INT", allowNull: false },
  title: { type: "VARCHAR(255)", allowNull: false },
  templateId: { type: "VARCHAR(255)", allowNull: false },
  data: { type: "JSON", allowNull: false },
  createdAt: { type: "DATETIME", allowNull: false },
  updatedAt: { type: "DATETIME", allowNull: false },
};

const coverLettersTable = {
  Id: {
    type: "INT",
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { type: "INT", allowNull: false },
  Title: { type: "VARCHAR(255)", allowNull: false },
  TemplateId: { type: "VARCHAR(255)", allowNull: false },
  Data: { type: "JSON", allowNull: false },
  createdAt: { type: "DATETIME", allowNull: false },
  updatedAt: { type: "DATETIME", allowNull: false },
};

const migration: Migration = {
  name: "001-baseline-schema",
  async up({ queryInterface }) {
    const existing = await queryInterface.showAllTables();
    const tables = new Set(existing.map((t) => String(t)));

    if (!tables.has("users")) {
      await queryInterface.createTable("users", usersTable);
    }

    if (!tables.has("resumes")) {
      await queryInterface.createTable("resumes", resumesTable);
      await queryInterface.addIndex("resumes", ["userId"]);
      await queryInterface.addConstraint("resumes", {
        fields: ["userId"],
        name: "resumes_user_fk",
        type: "foreign key",
        references: { table: "users", field: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    if (!tables.has("cover_letters")) {
      await queryInterface.createTable("cover_letters", coverLettersTable);
      await queryInterface.addIndex("cover_letters", ["userId"]);
      await queryInterface.addConstraint("cover_letters", {
        fields: ["userId"],
        name: "cover_letters_user_fk",
        type: "foreign key",
        references: { table: "users", field: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  },
  async down({ queryInterface }) {
    await queryInterface.dropTable("cover_letters");
    await queryInterface.dropTable("resumes");
    await queryInterface.dropTable("users");
  },
};

export default migration;
