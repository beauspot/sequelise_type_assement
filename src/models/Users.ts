import { Sequelize, DataTypes } from "sequelize";
import { SequelizeAttributes, ModelStatic } from "../types/SequelizeTypes";
import { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { UserAttributes } from "../interface/UserInterface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "email" | "password"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

//--> Model attributes
export const UserModelAttributes: SequelizeAttributes<UserAttributes> = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  firstName: {
    type: DataTypes.STRING,
    unique: true,
  },
  lastName: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user", // Set default value as "user"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  token: DataTypes.STRING,
};

//--> Model hooks
class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  static hooks = {
    beforeCreate: async (user: any, options: any) => {
      // Hash the password before saving it to the database
      user.password = await bcrypt.hash(user.password, 10);

      // Generate a token for the user
      user.token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );
    },
    beforeLogin: async (user: any, options: any) => {
      // Check if the password provided matches the hashed password in the database
      const isValidPassword = await bcrypt.compare(
        options.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
    },
  };
}

export default UserModel;
