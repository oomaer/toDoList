

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
}, {
    timestamps: true
})

UserSchema.index({email: 1}, {unique: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;