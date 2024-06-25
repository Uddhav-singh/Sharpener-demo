const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/users', async (req, res) => {
    const { username, phoneNumber, email } = req.body;
    try {
        const user = await User.create({ username, phoneNumber, email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
        // res.sendFile(path.join(__dirname, 'index.js'))
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
