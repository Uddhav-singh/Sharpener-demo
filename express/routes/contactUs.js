const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const contactController = require('../controllers/products')

// /admin/add-product => GET
router.get('/contact', contactController.getContact);

// /contact => POST
router.post('/contact', contactController.postContact);

// // Route to render the success page
router.get('/success', contactController.getSuccess);

module.exports = router;