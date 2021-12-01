const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tag: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = Tag;
