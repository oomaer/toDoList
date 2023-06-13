

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { compareSync } = require("bcrypt");
const { createNewUser, findUserByEmail, generateUserToken } = require('../services/UserService');
const {checkValidEmail, checkValidPassword, checkValidName} = require('../utils/validityCheckers');



/*
    @desc Register a user
    @route POST /users/register
    @access Public
    @required name, email, password are required in the request body
*/
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!checkValidEmail(email)){
            res.status(400).json({success: false, message: 'Invalid email'});
            return;
        }
        if(!checkValidPassword(password)){
            res.status(400).json({success: false, message: 'Invalid password'});
            return;
        }
        if(!checkValidName(name)){
            res.status(400).json({success: false, message: 'Invalid name'});
            return;
        }     
        const {newUser, token} = await createNewUser(name, email, password);
        res.status(201).json({success: true, message: 'User created successfully', jwt: token, user: {name: newUser.name, email: newUser.email, _id: newUser._id}});
        
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({success: false, message: 'Account already exists'});
            return;
        }
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

/*
    @desc Login a existing user
    @route POST /users/login
    @access Public
    @required email, password are required in the request body
*/
const loginUser = async (req, res) => {
    try{
        const user = await findUserByEmail(req.body.email);
        if(!user){
            res.status(400).json({success: false, message: 'Account does not exist'});
            return;
        }
        if(!compareSync(req.body.password, user.password)){
            res.status(400).json({success: false, message: 'The Password you entered is incorrect'});
            return;
        }
        const token = generateUserToken(user);
        res.status(200).json({success: true, message: 'User logged in successfully', jwt: token, user: {name: user.name, email: user.email, _id: user._id}});
    }

    catch(error){
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

/*
    @desc Authenticate a User token
    @route POST /users/authenticate
    @access Public
    @required jwt is required in the request header
*/
const authenticateUser = async (req, res) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await findUserByEmail(decoded.email);
        if(!user){
            res.status(400).json({success: false, message: 'User does not exist'});
            return;
        }
        res.status(200).json({success: true, message: 'User authenticated successfully', user: {name: user.name, email: user.email, _id: user._id}});
    }
    catch(error){
        if(error.message === `Cannot read properties of undefined (reading 'split')` || 
            error.message === `jwt malformed` ||
            error.message === `invalid token`
        ){
            res.status(401).json({success: false, message: 'Invalid Token'});
            return;
        }

        res.status(500).json({success: false, message: 'Internal server error'});
    }
}


module.exports = { 
    registerUser,
    loginUser,
    authenticateUser
}