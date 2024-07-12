const { where } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/user");

const addExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const userId = req.user.id; // Authenticated user ID

    const expense = await Expense.create({
      amount,
      description,
      category,
      userId,
    });

    res.send(expense);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID

    const expenses = await Expense.findAll({ where: { userId } });

    res.send(expenses);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID
    const expenseId = req.params.id;

    await Expense.destroy({ where: { id: expenseId, userId } });
    res.send({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).send("server error deleteExpense Controller");
  }
};
module.exports = { addExpense, getExpenses, deleteExpense };
