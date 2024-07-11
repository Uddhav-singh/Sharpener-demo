const express = require('express');
const router = express.Router();
const authMiddleware  = require('../middleware/authMiddleware');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');

// const router = express.Router();


console.log(addExpense, getExpenses)
router.post('/expenses', authMiddleware, addExpense);
router.get('/expenses', authMiddleware, getExpenses);
router.delete('/expenses/:id', authMiddleware, deleteExpense);

module.exports = router;
