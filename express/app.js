const express = require('express');

const app = express();

app.use((req,res, next) => {
    console.log("1st middleware!");
    next();
});

app.use((req,res,next)=>{
    console.log("2nd middleware!");
    res.send('<h1>Hello! from Express.js</h1>')
});

app.listen(3000);
