// Require model for local Games DB (depricated)
const db = require("../models/game.js");

// Require IGDB npm package and api-key
const igdb = require('igdb-api-node').default;
const ENV = require('../../server.js');

// Configure igdb client with api-key
const client = igdb(ENV.IGDB_KEY);

module.exports = {
    // Route for all games (local db only)
    findAll: function(req, res) {
        db
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },

    // Route to find one game (local db only)
    findOne: function(req, res) {
        db
        .find().where({ name: req.params.name})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },

    // IGDB API call to search for a title
    igdbFind: function(req, res) {
        console.log("Hitting IGDB for....", req.params.name);
        client.games({
            fields: ['id', 'name', 'url', 'cover', 'platforms'], // Fields to return
            limit: 3, // Limit results to return
            search: req.params.name
        }).then(response => {
            res.json(response);
        }).catch(error => {
            throw error;
        });
    }
};