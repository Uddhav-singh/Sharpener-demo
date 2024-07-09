const Expense = require('../models/expense');

const UserExpense = async(req, res)=> {
    const {amount, description, category} = req.body;
    const userId = req.user.id; // Get userId from the authenticated user
    try {
        const expense = await Expense.create({amount, description, category, userId});
        res.status(200).json({ message: 'User Expenses.' });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUserExpense = async (req, res) =>{
    const userId = req.user.id;
    try {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {UserExpense, getUserExpense};

// app.post('/expenses', async (req,res)=>{
//     const {amount, description, category} = req.body;

//     try {
//         const expense = await Expense.create({amount, description, category});
//         res.json(expense)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// });