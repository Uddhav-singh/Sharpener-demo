const User = require('../models/user');

const signUp = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = User.create({
        username,
        email,
        password,
    }).then(() => {
        
        console.log('registered user');
        res.send('user is created');
      })
      .catch(err => {
        console.log(err);
      });

    // if (user) {
    //     res.status(201).json({
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //         token: generateToken(user.id),
    //     });
    // } else {
    //     res.status(400).json({ message: 'Invalid user data' });
    // }
}

module.exports = signUp;