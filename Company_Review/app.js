const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const Review = require('./models/review.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/reviews', async(req,res)=>{
    const {companyName, pros, cons, rating} = req.body;

    try{
        const review = await Review.create({companyName, pros, cons, rating});
        res.json();
        // console.log(res)
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

app.get('/reviews', async(req, res)=>{
    try{
        const review = await Review.findAll()
        res.json(review)
    } catch (error){
        res.status(500).json({error:error.message});
    }
    
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`app is running on port: ${PORT}`);
})