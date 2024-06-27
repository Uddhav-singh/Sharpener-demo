const { type } = require('os');
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("userdb", "root", "rootpassword", {
  host: "localhost",
  dialect: "mysql",
});

const Review = sequelize.define(
  "review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pros: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cons: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "reviews",
    timestamps: true,
  }
);

sequelize.sync({ force: false }).then(() => {
  console.log("Database is in sync");
});

module.exports = Review;