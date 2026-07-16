import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { UserAttributes, UserCreationAttributes } from "../types/UserTypes";

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string | null;
  public googleId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public githubId!: string |null; 
  public resetPasswordToken!: string | null;
  public resetPasswordExpires!: Date | null;
  public passwordChangedAt!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    githubId: { 
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordChangedAt:{
      type:DataTypes.DATE,
      allowNull:true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  },
  

);

export default User;