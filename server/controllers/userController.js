

const User = require('../models/UserModel');


/*
    @desc Register a user
    @route POST /users/register
    @access Public
    @args name, email, password are required in the request body
*/
const registerUser = async (req, res) => {

    try {
    
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        const newUser = await user.save();
        res.status(201).json({success: true, message: 'User created successfully', user: {
            name: newUser.name,
            email: newUser.email,
            _id: newUser._id
        }});
        
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({success: false, message: 'Email already exists'});
            return;
        }
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

module.exports = { 
    registerUser
}