const db = require("../models");

// Defining methods for the usersController
module.exports = {
    findAll: function(req, res) {
        db.User
        .find(req.query)
        .then(dbModel => res.json(dbMOdel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.User
        .create(req.body)
        .then(dbMOdel => res.json(dbMOdel))
        .catch(err => res.status(422).json(err));
    }
};