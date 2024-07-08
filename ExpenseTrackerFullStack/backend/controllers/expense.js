const Expense = require('../models/expense');

const UserExpense = async(req, res)=> {
    const {amount, description, category} = req.body;
    try {
        const expense = await Expense.create({amount, description, category});
        res.status(200).json({ message: 'User Expenses.' });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUserExpense = async (req, res) =>{
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({error: error.message})
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