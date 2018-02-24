const db = require("../models/user.js");
const gameDb = require("../models/game.js");

module.exports = {
    findOneAndUpdate: function(req, res) {
        console.log(req.body);
        db
        .findById(req.body.userID, function(err, user) {
            if (err) return res.status(422).json(err);
            console.log("A", user);
            
            gameDb.findById(req.body.gameID, function(err, game) {
                if (err) return res.status(422).json(err);
                console.log("B", user);
                console.log("C", user.games);
                user.games.push(game);
                user.save(function (err, updatedUser) {
                    if (err) return res.stus(422).json(err);
                    res.send(game);
                });
            });
        });
    }
};