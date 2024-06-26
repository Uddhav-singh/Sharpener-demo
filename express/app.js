const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoute = require('./routes/contactUs');
const successRoute = require('./routes/success');
const errorController = require('./controllers/error404');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRoute);
app.use(successRoute);

app.use(errorController.error404);

app.listen(3000);
