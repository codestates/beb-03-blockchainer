require("dotenv").config();
const env = process.env;

const development = {
  username: "root",
  password: env.DATABASE_PASSWORD,
  database: "blockchainer",
  host: "127.0.0.1",
  dialect: "mysql",
};
const test = {
  username: "root",
  password: "null",
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  dialect: "mysql",
  logging: false,
};

module.exports = { development, production, test };
