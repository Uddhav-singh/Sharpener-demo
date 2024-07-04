const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');
const sequelize = require('./config/userdb');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const signUpRouter = require('./routes/signUpRoute');
const logInRouter = require('./routes/logInRoute');



app.use(signUpRouter);
app.use(logInRouter);

const PORT = 3000;

sequelize.sync().then(()=>{
    console.log('database is in sync');
    app.listen(PORT)
})


