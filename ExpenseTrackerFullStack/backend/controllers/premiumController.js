const sequelize = require('../config/userdb');
const User = require('../models/user');
const Expense = require('../models/expense');


const showleaderboard = async(req, res)=>{
    try {
        const users = await User.findAll({
            include:[{
                model: Expense,
                attributes: []
            }],
            attributes:['id', 'name',[sequelize.fn('sum', sequelize.col('expenses.amount')),'totalExpenses']],
            group:[User.id],
            order:[[sequelize.literal('totaleExpenses'), 'DESC']]
        })

        res.json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).send('Server error');
    }
};

module.exports = showleaderboard;