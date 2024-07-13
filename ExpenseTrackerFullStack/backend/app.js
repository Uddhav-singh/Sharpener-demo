const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/user");
const Expense = require("./models/expense");
const sequelize = require("./config/userdb");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const signUpRouter = require("./routes/signUpRoute");
const logInRouter = require("./routes/logInRoute");
const userExpenseRouter = require("./routes/userExpense");
const paymentRoutes = require("./routes/payment");
const isPrimiumUser = require("./routes/user");
const premiumRoute = require("./routes/premiumRoute");
const passwordRoute = require('./routes/passwordRoutes')

// Serve static files from the "frontend/public" directory
// app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use("/css", express.static(path.join(__dirname, "../frontend/css")));
app.use("/js", express.static(path.join(__dirname, "../frontend/js")));
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));

// app.use('/user', userRoutes);

app.use("/user", signUpRouter);
app.use("/user", logInRouter);
app.use("/user", userExpenseRouter);

app.use("/api/payment", paymentRoutes);
app.use("/api/user", isPrimiumUser);
app.use("/premium", premiumRoute);

// password reset 
app.use('/password', passwordRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/home.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/dashboard.html"));
});

const PORT = 3000;
// Make sure to initialize associations
// User.associate({ Expense });
// Expense.associate({ User });

sequelize.sync({ force: false }).then(() => {
  console.log("database is in sync");
  app.listen(PORT);
});
