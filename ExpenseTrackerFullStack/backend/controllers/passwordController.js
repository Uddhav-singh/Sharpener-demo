// 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

const SibApiV3Sdk = require('sib-api-v3-sdk');
const express = require('express');
const User = require('../models/user'); // Assuming you have a User model

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Send reset email using Brevo
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email }],
      sender: { email: 'stevesstilinski41@gmail.com', name: 'Sharpener Tech' },
      subject: 'Password Reset Request',
      htmlContent: `<p>Dear user,</p><p>Click <a href="http://localhost:3000/reset-password?email=${email}">here</a> to reset your password.</p>`
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.send('Password reset email sent');
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).send('Error sending reset email');
  }
};

module.exports = forgotPassword ;
