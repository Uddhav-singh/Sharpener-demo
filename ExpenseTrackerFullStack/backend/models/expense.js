const Sequelize = require("sequelize");

const sequelize = require("../config/userdb");
const User = require("./user");

const Expense = sequelize.define(
  "expense",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    tableName: "expenses",
    timestamps: true, // This is enabled by default
  }
);

Expense.belongsTo(User, { as: "user", foreignKey: "userId" });
User.hasMany(Expense, { as: "expenses", foreignKey: "userId" });

module.exports = Expense;
