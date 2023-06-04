
const User = require('../models/UserModel');
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*
  This middleware is used to check if the user is authorized to access the route.
  It checks if the token is valid and if the user exists in the database.
*/

module.exports.isAuthorized = async (req, res, next) => {
    try {
      const JWT_SECRET = process.env.JWT_KEY;
      if(!req.headers.authorization) {
        throw new Error("Not authorized! Go back!");
      }
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      //token is valid, check if user exists
      const user = await User.find({
        _id: decoded.id,
        email: decoded.email
      });
      if(!user){
        throw new Error('Not authorized! Go back!');
      }
      next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Not authorized! Go back!'
        })
    }
}