const Sequelize = require("sequelize");

const sequelize = require("../config/userdb");
const User = require('./user');

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
  },
  {
    tableName: "expenses",
    timestamps: true, // This is enabled by default
  }
);

// sequelize
//   .sync({ force: false }) // if we set it "true", This will drop the table if it already exists and create a new one
//   .then(() => {
//     console.log("Database is created");
//   });
// Define associations
Expense.associate = (models) => {
  Expense.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Expense;
