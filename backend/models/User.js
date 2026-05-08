const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [20, 60],
    },
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING(400),
  },

  role: {
    type: DataTypes.ENUM("ADMIN", "USER", "STORE_OWNER"),
    defaultValue: "USER",
  },
});

module.exports = User;