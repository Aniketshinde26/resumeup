import { Optional } from "sequelize";

export interface CoverLetterAttributes {
  Id: number;
  userId: number;
  Title: string;
  TemplateId: string;
  Data: object;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CoverLetterCreationAttributes
  extends Optional<CoverLetterAttributes, "Id" | "createdAt" | "updatedAt"> {}