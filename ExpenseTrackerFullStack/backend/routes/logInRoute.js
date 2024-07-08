const express = require('express');
const logInUser = require('../controllers/login');

const router = express.Router()

router.post('/login', logInUser);

module.exports = router;