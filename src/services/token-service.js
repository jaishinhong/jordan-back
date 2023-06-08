const jwt = require("jsonwebtoken");

exports.sign = (payload) =>
    jwt.sign(payload, process.env.JWT_SECREAT_KEY, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });

exports.verify = (token) => jwt.verify(token, process.env.JWT_SECREAT_KEY); //return payload
