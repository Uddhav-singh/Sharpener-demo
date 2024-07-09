// const { where } = require("sequelize");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const path = require('path')

const logIn = async (req, res) => {
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
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = logIn;


