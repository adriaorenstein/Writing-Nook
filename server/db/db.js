const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost/writing-nook", {
  logging: false,
});

module.exports = db;
