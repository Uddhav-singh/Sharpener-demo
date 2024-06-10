const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/contact', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact.html'));
});

// /contact => POST
router.post('/contact', (req, res, next) => {
  console.log(req.body);
  res.redirect('/success');
});

// // Route to render the success page
router.get('/success', (req, res) => {
    res.send('<h1>Form successfuly filled</h1>');
  });

module.exports = router;