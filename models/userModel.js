const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.ENUM("admin", "employee"),
      defaultValue: "employee", // Default to employee, change as per your need
    },

    name: {
      type: DataTypes.STRING,
    },

    phoneNo: {
      type: DataTypes.STRING,
    },

    profile: {
      type: DataTypes.STRING,
    },

    gender: {
      type: DataTypes.STRING,
    },

    DOJ: {
      type: DataTypes.DATEONLY,
    },

    permanentAddress: {
      type: DataTypes.STRING,
    },

    localAddress: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

User.sync({ force: false });

module.exports = User;
