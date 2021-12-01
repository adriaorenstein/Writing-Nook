const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleId: Sequelize.STRING,
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

const Profile = db.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [[3, 15]],
        msg: "Username must be between 3 and 15 characters long",
      },
    },
  },
  status: {
    type: Sequelize.STRING(300),
    allowNull: true,
  },
  bio: {
    type: Sequelize.STRING(4000),
    allowNull: true,
  },
  favoriteBooks: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  characterDoppel: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  googleId: {
    type: Sequelize.STRING,
  },
});

module.exports = { User, Profile };
