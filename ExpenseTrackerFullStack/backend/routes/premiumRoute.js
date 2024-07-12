const express = require('express');
const router = express.Router();
const showleaderboard = require('../controllers/premiumController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/showleaderboard', authMiddleware, showleaderboard);

module.exports = router;