const { where } = require("sequelize");
const User = require("../models/user");

const logIn = async (req, res) => {
  // const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const userEmail = await User.findOne({ where: { email: email } });
  const userPassword = await User.findOne({ where: { password: password } });

  if (userEmail) {
    if (userPassword) {
      res.send('"welcome to the expense tracker app."');
    } else {
      res.send("Incorrect Password Try again with right password.");
    }
  } else {
    res.send("User does not exist");
  }
};

module.exports = logIn;
