const db = require("../models/game.js");

module.exports = {
    findAll: function(req, res) {
        db
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }
};