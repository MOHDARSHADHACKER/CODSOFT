const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Register a new user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};


// Login with an existing user
const login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('password:::', password)
    try {
        const user = await User.findOne({ username });
        console.log('user:::', user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password, user.password);
        console.log('passwefd::', passwordMatch)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        console.log('process.env.:::', process.env.SECRET_KEY)
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });

        const data = {
            username: user.username,
            email: user.email,
            token
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };