const User = require("../models/user");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = signUp;
