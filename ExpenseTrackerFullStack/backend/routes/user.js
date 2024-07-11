const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const getUser  = require('../controllers/user'); // Ensure correct path to user controller
const router = express.Router()

router.get('/', authMiddleware, getUser);

module.exports = router;
