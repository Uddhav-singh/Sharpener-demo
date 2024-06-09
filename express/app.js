const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("1st middleware!");
//   next();
// });

app.get('/add-product',(req, res, next) => {
  console.log("1st middleware!");
  res.send(`
    <form action="/product" method="POST">
        <input type="text" name="title">
        <input type="text" name="size">
        <button type="submit">Add Product</button>
    </form>
`);
});

app.use('/product', (req, res, next) => {
    const { title, size } = req.body;
    console.log(`Title: ${title}, Size: ${size}`);
    // console.log(req.body);
    res.redirect('/');
});

app.use('/', (req,res,next)=>{
    res.send("hello from express")
})

app.listen(3000);
