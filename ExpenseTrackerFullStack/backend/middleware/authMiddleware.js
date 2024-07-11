const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    console.log('authMiddleware called');
    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = await User.findByPk(decoded.id);
        console.log(decoded)
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authMiddleware;


// const authMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     try {
//         const decoded = jwt.verify(token, 'secret_key');
//         const user = await User.findByPk(decoded.id);
//         if (!user) {
//             throw new Error();
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate.' });
//     }
// };

// module.exports = authMiddleware;



// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const authMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     try {
//         const decoded = jwt.verify(token, 'your_jwt_secret_key');
//         const user = await User.findByPk(decoded.id);
//         if (!user) {
//             throw new Error();
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate' });
//     }
// };

// module.exports = authMiddleware;
