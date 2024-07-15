// controllers/forgotPassword.js
const { v4: uuidv4 } = require('uuid');
const ForgotPasswordRequest = require('../models/forgotPasswordRequests');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const SibApiV3Sdk = require('sib-api-v3-sdk');

require('dotenv').config();


// Using environment variables for sensitive data
const brevoApiKey = process.env.BREVO_API_KEY;


const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = brevoApiKey;

const sendResetEmail = async (email, resetURL) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = { email: 'stevesstilinski41@gmail.com', name: 'Sharpener Tech' };
  sendSmtpEmail.subject = 'Password Reset';
  sendSmtpEmail.htmlContent = `<p>Click the following link to reset your password: <a href="${resetURL}">${resetURL}</a></p>`;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const requestId = uuidv4();

    await ForgotPasswordRequest.create({
      id: requestId,
      userId: user.id,
      isActive: true,
    });

    const resetURL = `http://localhost:3000/password/resetpassword?id=${requestId}`;

    await sendResetEmail(email, resetURL);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  try {
    const request = await ForgotPasswordRequest.findOne({ where: { id, isActive: true } });

    if (!request) {
      return res.status(404).json({ message: 'Invalid or expired password reset link' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { id: request.userId } });

    request.isActive = false;
    await request.save();

    res.status(200).json({ message: 'Password updated successfully' });
    // Redirect to login.html after successful password reset
    // res.redirect('/login.html');
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { forgotPassword, resetPassword };
