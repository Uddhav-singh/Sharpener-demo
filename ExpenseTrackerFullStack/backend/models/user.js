const Sequelize = require('sequelize');

const sequelize = require('../config/userdb');

const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName:'users',
        timestamps: true  // This is enabled by default
      }
);

module.exports = User;