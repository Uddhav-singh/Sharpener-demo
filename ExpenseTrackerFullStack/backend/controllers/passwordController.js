const BrevoApi = require('sib-api-v3-sdk');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const forgotPassword = async (req, res)=>{
    const email = req.body;
    try {
        // check if user exist 
        const user = await User.findOne({where:{email}});
        if(!user){
            res.status(400).send('user not found');
        }

        // generate reset token 
        const resetToken = jwt.sign({userId : user.id}, 'secret_key',  { expiresIn: '1h' });
         // Save the token in the user's record (optional)
         user.resetPasswordToken = resetToken;
         await user.save();
 
         // Setup Brevo API
         let defaultClient = SibApiV3Sdk.ApiClient.instance;
         let apiKey = defaultClient.authentications['api-key'];
        //  brevo sevret key 
         apiKey.apiKey = 'xsmtpsib-9fe1e47df9f1bfe778d1c871ed917e0577ed5dc513373c5684ac8b446e63c570-K9cIaWGDXZ3L8UxJ';
 
         // Send email
         let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
         let sendSmtpEmail = {
             to: [{ email }],
             sender: { email: 'stevesstilinski41@gmail.com', name: 'Sharpener Test' },
             subject: 'Password Reset Request',
             htmlContent: `
                 <h1>Password Reset Request</h1>
                 <p>To reset your password, please click the link below:</p>
                 <a href="http://localhost:3000/password/forgotpassword?token=${resetToken}">Reset Password</a>
             `,
            //  <a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>
         };
 
         await apiInstance.sendTransacEmail(sendSmtpEmail);
 
         res.send('Password reset email sent');
     } catch (error) {
         console.error('Error in forgot password:', error);
         res.status(500).send('Server error');
     }
 };
 
 module.exports =  forgotPassword ;
    
