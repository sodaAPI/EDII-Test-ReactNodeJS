const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const { DataTypes } = Sequelize;
const PelatihanModel = db.define(
  "pelatihan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
      },
    name: {
      type: DataTypes.STRING,
    },
    certificate: {
      type: DataTypes.STRING,
    },
    year: {
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

module.exports = PelatihanModel;
