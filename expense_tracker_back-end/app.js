const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const Expense = require('./models/expense');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/expenses', async (req,res)=>{
    const {amount, description, category} = req.body;

    try {
        const expense = await Expense.create({amount, description, category});
        res.json(expense)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

app.get('/expenses', async (req, res)=>{
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});