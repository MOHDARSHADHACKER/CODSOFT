const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            reguired: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const password = user.password.trim()
        user.password = await bcrypt.hash(password,10);
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword, encryptedPassword) {
    try {
        console.log('Candidate Password:', candidatePassword);
        console.log('Hashed Password in DB:', this.password);
        console.log('encrypted::::', encryptedPassword)

        const match = await bcrypt.compare(candidatePassword.trim(), this.password);
        console.log('Password Match:', match);

        return match;
    } catch (error) {
        console.error('Error in comparePassword:', error);
        return false;
    }
};

const User = mongoose.model('user', userSchema);

module.exports = User;

