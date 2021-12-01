const Sequelize = require("sequelize");
const db = require("../db");

const Story = db.define("story", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(2000),
    allowNull: false,
  },
  storytext: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  totalRating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  numRatings: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

const Comment = db.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  commenttext: {
    type: Sequelize.STRING(3000),
    allowNull: false,
  },
});

const Review = db.define("review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reviewtext: {
    type: Sequelize.STRING(3000),
    allowNull: true,
  },
});

const List = db.define("list", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  toberead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  favorites: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { Story, Comment, Review, List };
