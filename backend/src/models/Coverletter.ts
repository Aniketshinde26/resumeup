import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import {
  CoverLetterAttributes,
  CoverLetterCreationAttributes,
  CoverLetterData,
} from "../types/CoverLetterTypes";

class CoverLetter
  extends Model<CoverLetterAttributes, CoverLetterCreationAttributes>
  implements CoverLetterAttributes
{
  public Id!: number;
  public userId!: number;
  public Title!: string;
  public TemplateId!: string;
  public Data!: CoverLetterData;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
CoverLetter.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TemplateId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CoverLetter",
    tableName: "cover_letters",
  },
);
export default CoverLetter;
