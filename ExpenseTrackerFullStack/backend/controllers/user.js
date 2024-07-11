const User = require('../models/user');

const getUser = async (req, res) => {
    try {
        const user = req.user;
        // await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({
            id: user.id,
            email: user.email,
            isPremiumUser: user.isPremiumUser
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = getUser;