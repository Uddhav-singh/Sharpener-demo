const User = require("../models/user");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const user =
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.send("user is registered.");
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// (req, res) => {
//   try {
//     // const username = req.body.username;
//     // const email = req.body.email;
//     // const password = req.body.password;
//     const {username, email, password} = req.body;

//     const saltRound = 1;
//     bcrypt.hash(password, saltRound, async function(err, hash){
//       // console.log(err);
//       // console.log(result);
//       await User.create({username, email, password:hash});
//       res.status(201).send('user created')
//     })
//   } catch (error) {
//     console.log(error);
//   }

// ---------------------------------------------------------------------
// const user = User.create({
//     username,
//     email,
//     password,
// }).then(() => {

//     console.log('registered user');
//     res.send('user is created');
//   })
//   .catch(err => {
//     console.log(err);
//   });
// ------------------------------------------------------------------------------
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
// }

module.exports = signUp;
