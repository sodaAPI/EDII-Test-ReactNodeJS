const { Sequelize } = require("sequelize");
const db = require("../config/database.js");
const { DataTypes } = Sequelize;
const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    ktp: {
      type: DataTypes.STRING,
    },
    birth_place: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    religion: {
      type: DataTypes.STRING,
    },
    bloodtype: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    ktp_address: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    close_phone: {
      type: DataTypes.STRING,
    },
    education_id: {
      type: DataTypes.STRING,
    },
    training_id: {
      type: DataTypes.STRING,
    },
    job_id: {
      type: DataTypes.STRING,
    },
    skill: {
      type: DataTypes.STRING,
    },
    willing_to_placed: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
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

module.exports = User;
