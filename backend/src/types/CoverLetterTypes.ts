import { Optional } from "sequelize";

export interface CoverLetterAttributes {
  id: number;
  userId: number;
  title: string;
  templateId: string;
  data: object;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CoverLetterCreationAttributes
  extends Optional<CoverLetterAttributes, "id" | "createdAt" | "updatedAt"> {}