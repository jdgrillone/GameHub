const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

const ENV = require('../../server.js');


// The Auth Checker middleware function.
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // Get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // Decode the token using a secret key-phrase
    return jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
        // The 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;

        // Check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            // Pass user details onto next route
            req.user = user
            return next();
        });
    });
};
