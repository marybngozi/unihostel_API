require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret';

const issue = (payload) => jwt.sign(payload, secret, { expiresIn: "3h" });

const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

// add verify user and verify admin
module.exports = {issue, verify};