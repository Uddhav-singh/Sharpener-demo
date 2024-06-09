const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRoute = require("./routes/admin.js");
const shopRoute = require("./routes/shop.js");


app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("1st middleware!");
//   next();
// });
app.use('/admin', adminRoute);
app.use('/shop' ,shopRoute);

app.use((req,res)=>{
    res.status(404).send(`<h1>Page not found.</h1>`)
})

app.listen(3000);
