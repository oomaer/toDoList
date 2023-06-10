
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.getUserEmailFromJwt = (authorization) => {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded.email;
}