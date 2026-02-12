import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { CoverLetterAttributes,CoverLetterCreationAttributes } from "../types/CoverLetterTypes";

class CoverLetter
  extends Model<CoverLetterAttributes, CoverLetterCreationAttributes>
  implements CoverLetterAttributes
  {
    public id!: number;
    public userId!: number;
    public title!: string;
    public templateId!: string;
    public data!: object;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  CoverLetter.init(
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
        modelName: "CoverLetter",
        tableName: "cover_letters",
    }
  );
  export default CoverLetter;