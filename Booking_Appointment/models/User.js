const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('userdb', 'root', 'rootpassword', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true  // This is enabled by default
});

sequelize.sync({ force: false })  // This will drop the table if it already exists and create a new one
    .then(() => {
        console.log("Database & tables created!");
    });

module.exports = User;
