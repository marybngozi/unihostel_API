const {verify} = require('../utils/auth');
const log = require('../utils/log');

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = (req, res, next) => {
    let tokenToVerify;

    if (req.header('Authorization')) {
        const parts = req.header('Authorization').split(' ');

        if (parts.length == 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/.test(scheme)) {
                tokenToVerify = credentials;
            } else {
                return res.status(401).json({ message: 'Format for Authorization: Bearer [token]' });
            }
        } else {
            return res.status(401).json({ message: 'Format for Authorization: Bearer [token]' });
        }
    } else if (req.body.token) {
        tokenToVerify = req.body.token;
        delete req.query.token;
    } else {
        return res.status(401).json({ message: 'No Authorization was found' });
    }

    return verify(tokenToVerify, (err, thisToken) => {
        if (err) {
            console.log(err.message);
            return res.status(401).json({ 
                status: "error",
                name: 'Invalid token' ,
                message: err.message,
            });
        }

        req.token = thisToken;
        // log the request
        // log(``);
        return next();
    });
};
