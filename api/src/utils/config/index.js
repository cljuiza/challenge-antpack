//aca interactuamos con nuestro entorno
require("dotenv").config();

module.exports = {
  dbUser: process.env.DB_USER || "postgres",
  dbName: process.env.DB_NAME || "userantpack",
  dbPort: process.env.DB_PORT || "5432",
  dbHost: process.env.DB_HOST || "localhost",
  dbPasword: process.env.DB_PASSWORD || "password",
  host: process.env.HOST || "localhost",
  PORT: process.env.PORT || "3001",
};
