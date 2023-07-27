import config from "./AppConfig";

const DbConfig = {
  development: {
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "postgresql",
    logging: false,
    define: {
      freezeTableName: true,
    },
  },
};

export default Object.freeze(DbConfig);
