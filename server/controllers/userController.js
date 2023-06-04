

const User = require('../models/UserModel');


const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({user: {name, email}});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}