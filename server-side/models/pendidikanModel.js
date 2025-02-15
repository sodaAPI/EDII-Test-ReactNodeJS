const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const { DataTypes } = Sequelize;
const PendidikanModel = db.define(
  "pendidikan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
      },
    education: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    major: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    gpa: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = PendidikanModel;
