const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenses', 'root', 'rootpassword', {
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;