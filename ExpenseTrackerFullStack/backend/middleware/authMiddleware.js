const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  console.log("authMiddleware called");
  const token = req.header("Authorization");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = await User.findByPk(decoded.id);
    console.log(decoded);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authMiddleware;
