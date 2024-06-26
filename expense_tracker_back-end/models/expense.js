const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("userdb", "root", "rootpassword", {
  host: "localhost",
  dialect: "mysql",
});

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    tableName:'expenses',
    timestamps: true  // This is enabled by default
  }
);

sequelize.sync({force: false}) // if we set it "true", This will drop the table if it already exists and create a new one
.then(()=>{
    console.log("Database is created")
});

module.exports = Expense;