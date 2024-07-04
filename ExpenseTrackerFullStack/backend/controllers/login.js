const { where } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const logIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await User.findOne({ where: { email: email } });

    if (userEmail && (await bcrypt.compare(password, userEmail.password))) {
      res.send("You have logged in.");
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = logIn;
