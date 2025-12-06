import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

// Define which fields are required and which are optional
interface UserAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string;
  refreshToken: string | null;
}

// When creating a user, "id" is optional because it's auto-increment
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string | null;
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
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
