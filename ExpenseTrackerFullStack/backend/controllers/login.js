// const { where } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const path = require('path')

const logIn = async (req, res) => {
  // try {
  //   const email = req.body.email;
  //   const password = req.body.password;

  //   const userEmail = await User.findOne({ where: { email: email } });

  //   if (userEmail && (await bcrypt.compare(password, userEmail.password))) {
  //     // res.send("You have logged in.");
  //     res.sendFile(path.join(__dirname,'../../frontend/public/dashbord.html'));
  //   } else {
  //     res.status(401).json({ message: "Invalid email or password" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: "Server error", error: error.message });
  // }
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

module.exports = logIn;

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//           return res.status(400).json({ message: 'Invalid credentials' });
//       }
//       res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//       res.status(400).json({ error: error.message });
//   }
// };
