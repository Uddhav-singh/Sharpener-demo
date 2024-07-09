const Sequelize = require("sequelize");
const sequelize = require("../config/userdb");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true, // This is enabled by default
  }
);

User.prototype.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this.id, email: this.email },
    "secret_key",
    // { expiresIn: "1h" }
  );
  return token;
};

User.associate = (models) => {
  User.hasMany(models.Expense, { foreignKey: "userId", as: "expenses" });
};

module.exports = User;
