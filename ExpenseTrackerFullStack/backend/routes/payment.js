// const express = require('express');
// const Razorpay = require('razorpay');
// const router = express.Router();

// const razorpay = new Razorpay({
//     key_id: 'rzp_test_DUVm7xQwKRRlSY', // Replace with your Key ID
//     key_secret: 'WIsdLL6lLrO1GNmmbj9u8iwW', // Replace with your Key Secret
// });

// router.post('/create-order', async (req, res) => {
//     const amount = 50000; // Amount in paise (50000 paise = 500 INR)

//     try {
//         const order = await razorpay.orders.create({
//             amount: amount,
//             currency: 'INR',
//             receipt: 'receipt_order_74394',
//         });
//         res.json(order);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;
const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const authMiddleware  = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-order', authMiddleware, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment);

module.exports = router;
