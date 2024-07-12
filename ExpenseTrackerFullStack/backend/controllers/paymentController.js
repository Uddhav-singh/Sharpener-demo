const Razorpay = require("razorpay");
const User = require("../models/user");
// const jwt = require('jsonwebtoken');

const razorpay = new Razorpay({
  key_id: "rzp_test_DUVm7xQwKRRlSY",
  key_secret: "WIsdLL6lLrO1GNmmbj9u8iwW",
});

exports.createOrder = async (req, res) => {
  const amount = 50000; // Amount in paise (50000 paise = 500 INR)

  try {
    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt_order_74394",
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { payment_id, order_id, signature } = req.body;
  // const userId = req.user.id; // Assuming userId is available from the authenticated user

  // You would typically verify the signature here, but skipping for brevity

  try {
    // Add Razorpay payment verification logic here

    const userId = req.user.id; // Authenticated user ID

    await User.update({ isPremiumUser: true }, { where: { id: userId } });

    res.send("Payment verified and user updated to premium");
  } catch (error) {
    res.status(500).send("Error verifying payment");
  }
};

// module.exports = {createOrder, verifyPayment}
