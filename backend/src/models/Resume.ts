import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import {
  ResumeAttributes,
  ResumeCreationAttributes,
} from "../types/ResumeTypes";

class Resume
  extends Model<ResumeAttributes, ResumeCreationAttributes>
  implements ResumeAttributes
{
  public id!: number;
  public userId!: number;
  public title!: string;
  public templateId!: string;
  public data!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Resume.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    templateId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Resume",
    tableName: "resumes",
  }
);

export default Resume;
