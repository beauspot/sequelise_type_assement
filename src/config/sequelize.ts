import { Sequelize } from "sequelize";
import config from "./config";

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
  }
);

export default sequelize;
