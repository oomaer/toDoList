
const UserModel = require('../models/UserModel');
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.isAuthorized = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_KEY;
    if(!req.headers.authorization) {
      var err = new Error('Not authorized! Go back!');
      err.status = 401;
      return next(err);
    }

    let token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      //token is valid, check if user exists
      UserModel.findById(decoded.id).then((user) => {
        if (user && user.accountStatus === 'active') {
          next();
        } else {
          var err = new Error('Not authorized! Go back!!');
          err.status = 401;
          return next(err);
        }
      });
    } catch (err) {
      var err = new Error('Not authorized! Go back!');
      err.status = 401;
      return next(err);
    }
}