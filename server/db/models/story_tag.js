const Sequelize = require("sequelize");
const db = require("../db");

const Story_Tag = db.define("story_tag", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Story_Tag;
