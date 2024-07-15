const express = require('express');
const path = require('path');
const router = express.Router();
const {forgotPassword, resetPassword} = require('../controllers/forgotPassword');

router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:id', resetPassword);

// Serve resetPassword.html for GET requests to /password/resetpassword/:id
router.get('/resetpassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/resetPassword.html'));
});

module.exports = router;
