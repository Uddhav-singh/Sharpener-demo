const express = require('express');
const logInUser = require('../controllers/login');

const router = express.Router()

router.post('/user/login', logInUser);

module.exports = router;