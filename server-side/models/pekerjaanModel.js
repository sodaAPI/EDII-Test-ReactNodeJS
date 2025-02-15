const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const User = require("./userModel.js");
const PelatihanModel = require("./pelatihanModel.js")
const PendidikanModel = require("./pendidikanModel.js")
const { DataTypes } = Sequelize;
const PekerjaanModel = db.define(
  "pekerjaan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    company: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    salary: {
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

// In pekerjaanModel.js
PekerjaanModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(PekerjaanModel, { foreignKey: "user_id" });

// In pelatihanModel.js
PelatihanModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(PelatihanModel, { foreignKey: "user_id" });

// In pendidikanModel.js
PendidikanModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(PendidikanModel, { foreignKey: "user_id" });

module.exports = PekerjaanModel;
