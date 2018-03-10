const db = require("../models/user.js");
const gameDb = require("../models/game.js");
const igdb = require('igdb-api-node').default;
const config = require("../../config/index.json");
const client = igdb(config.igdb_key);

module.exports = {
    // Route to update game list for one user
    findOneAndUpdate: function (req, res) {
        db
            .findById(req.body.userID, function (err, user) {
                if (err) return res.status(422).json(err);

                client.games(
                    {
                        ids: [
                            req.body.gameID
                        ]
                    },
                [
                    'id', 'name', 'url', 'cover', 'game', 'platforms'
                ]).then(response => {
                    user.games.push(response.body[0]);
                    user.save(function (err, updatedUser) {
                        if (err) return res.status(422).json(err);
                        res.send(response);
                    });
                });
                
                // gameDb.findById(req.body.gameID, function (err, game) {
                //     if (err) return res.status(422).json(err);
                //     user.games.push(game);
                //     user.save(function (err, updatedUser) {
                //         if (err) return res.status(422).json(err);
                //         res.send(game);
                //     });
                // });
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
            .findById(req.params.id, function (err, user) {
                if (err) return res.status(422).json(err);
                res.send(user);
            });
    },

    // Route to delete game from user
    findOneAndDelete: function (req, res) {
        db
            .update(
                { "_id": req.body.userID },
                { $pull: { "games": { id: req.body.gameID } } }, function (err, data) {
                    if (err) {
                        return res.status(500).json({ 'error': 'error in deleting game' });
                    }
                    res.json(data);
                });
    },

    // Route to follow user
    findOneAndFollow: function (req, res) {
        db
        .update({'_id': req.body.userID}, {'$push': {'following': req.body.friendID}}, function (err, data) {
            if (err) {console.log(err)}
            
        });
    },

    // Route to toggle active game
    findOneAndToggle: function (req, res) {
        db.update({ "_id": req.body.userID }, { $set: { "active": req.body.game }}, function(err, data) {
            if (err) {
                return res.status(500).json({ 'error': 'error in deleting game'});
            }
            res.json(data);
        });
    },

    // Route to get following
    findOnePopulateFollowing: function (req, res) {
        db.findById(req.params.id).populate({ path: 'following'}).exec(function (err, data) {
            if (err) {console.log(err)}

            res.json(data.following);
        })
    },

    // Route to search Users
    findUser: function (req, res) {
        db
        .find().where({ name: req.params.name})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }
};