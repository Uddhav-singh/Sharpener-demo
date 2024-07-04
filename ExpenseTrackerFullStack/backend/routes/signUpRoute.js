const express = require('express');
const registerUser = require('../controllers/signup');

const router = express.Router()

router.post('/user/register', registerUser);

module.exports = router;