require('dotenv').config();
const fs = require('fs');

const environment = process.env.NODE_ENV;
const port = process.env.PORT;

const development = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: 'mysql',
  // operatorsAliases: false
};

const test = {
  database: process.env.DB_NAME_TEST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: 'mysql',
  // operatorsAliases: false
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: 'mysql',
  // operatorsAliases: false
};

module.exports = {
  development,
  test,
  production,
  environment,
  port,
};
