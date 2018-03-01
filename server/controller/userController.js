const db = require("../models/user.js");
const gameDb = require("../models/game.js");

module.exports = {
    // Route to update game list for one user
    findOneAndUpdate: function (req, res) {
        db
            .findById(req.body.userID, function (err, user) {
                if (err) return res.status(422).json(err);

                gameDb.findById(req.body.gameID, function (err, game) {
                    if (err) return res.status(422).json(err);
                    user.games.push(game);
                    user.save(function (err, updatedUser) {
                        if (err) return res.stus(422).json(err);
                        res.send(game);
                    });
                });
            });
    },

    // Route to find all users
    findAll: function (req, res) {
        db
        .find({}, 'name', function (err, user) {
                if (err) return res.status(422).json(err);
                res.send(user);
        });
    },

    // Route to find one user
    findOne: function (req, res) {
        db
        .findById(req.params.id, function(err, user) {
            if (err) return res.status(422).json(err);
            res.send(user);
        });
    },

    // Route to delete game from user
    findOneAndDelete: function(req, res) {
        db
        .update(
            { "_id": req.body.userID},
            { $pull: { "games" : { id: req.body.gameID } } }, function (err, data){
                if (err) {
                    return res.status(500).json({ 'error': 'error in deleting game' });
                }
                res.json(data);
            });
    }
};