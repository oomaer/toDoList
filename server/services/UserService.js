
const User = require('../models/UserModel');
const { hashSync } = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

const createNewUser = async (name, email, password) => {

    const user = new User({ name, email, password: hashSync(password, saltRounds)});
    const newUser = await user.save();
    const token = generateUserToken(newUser);
    return {newUser, token};

}


const findUserByEmail = async (email) => {
    return await User.findOne({email})    
}


const generateUserToken = (user) => {
    return jwt.sign({
        email: user.email,
    }, process.env.JWT_KEY);
}

module.exports = {
    createNewUser,
    findUserByEmail,
    generateUserToken
}
