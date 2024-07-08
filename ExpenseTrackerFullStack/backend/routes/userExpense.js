const express = require('express');
const userExpense = require('../controllers/expense');

const router = express.Router()

router.post('/expenses', userExpense.UserExpense);
router.get('/expenses', userExpense.getUserExpense);

module.exports = router;