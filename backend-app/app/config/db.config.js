const localVariables = require("./enviroments");
module.exports = {
  HOST: localVariables.host,
  USER: localVariables.user,
  PASSWORD: localVariables.password,
  DB: "inviggoNet",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
