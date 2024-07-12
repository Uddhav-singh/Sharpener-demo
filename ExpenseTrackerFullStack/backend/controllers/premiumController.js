const sequelize = require("../config/userdb");
const User = require("../models/user");
const Expense = require("../models/expense");

const showleaderboard = async (req, res) => {
  // try {
    // const users = await User.findAll({
    //   include: [
    //     {
    //       model: Expense,
    //       as: "expenses", // Specify the alias here
    //       attributes: [],
    //     },
    //   ],
    //   attributes: [
    //     "username",
    //     [
    //       sequelize.fn("sum", sequelize.col("expenses.amount")),
    //       "totalExpenses",
    //     ],
    //   ],
    //   group: ["user.id"],
    //   order: [["totalExpenses", "DESC"]],
    // });
    try {
      const users = await User.findAll({
          attributes: ['username', 'totalExpense'],
          order: [['totalExpense', 'DESC']]
      });

      res.json(users);

    res.json(users);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send("Server error");
  }
};

module.exports = showleaderboard;
