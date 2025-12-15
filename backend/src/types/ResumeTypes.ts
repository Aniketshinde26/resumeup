import { Optional } from "sequelize";

export interface ResumeAttributes {
  id: number;
  userId: number;
  title: string;
  templateId: string;
  data: object; // flexible JSON structure
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResumeCreationAttributes
  extends Optional<ResumeAttributes, "id" | "createdAt" | "updatedAt"> {}
