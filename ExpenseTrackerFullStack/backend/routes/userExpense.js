const express = require('express');
const userExpense = require('../controllers/expense');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/expenses', authMiddleware, userExpense.UserExpense);
router.get('/expenses', authMiddleware,  userExpense.getUserExpense);

module.exports = router;