const Sequelize = require('sequelize');
const sequelize = require('../config/userdb');
const {v4: uuidv4} = require('uuid');
const User = require('./user');

const ForgotPasswordRequest = sequelize.define('ForgotPasswordRequest', {
    id:{
        type: Sequelize.UUID,
        defaultValue: uuidv4,
        allowNull: false,
        primaryKey: true,
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id',
        },
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

User.hasMany(ForgotPasswordRequest, {foreignKey:'userId'});
ForgotPasswordRequest.belongsTo(User, {foreignKey:'userId'});

module.exports = ForgotPasswordRequest;