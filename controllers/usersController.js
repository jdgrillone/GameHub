const db = require("../models");

// Defining methods for the usersController
module.exports = {
    create: function(req, res) {
        db.User
        .create(req.body)
        .then(dbMOdel => res.json(dbMOdel))
        .catch(err => res.status(422).json(err));
    }
};