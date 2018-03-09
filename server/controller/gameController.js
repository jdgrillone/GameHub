const db = require("../models/game.js");
const igdb = require('igdb-api-node').default;
const config = require("../../config/index.json");
const client = igdb(config.igdb_key);

module.exports = {
    findAll: function(req, res) {
        db
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },

    findOne: function(req, res) {
        db
        .find().where({ name: req.params.name})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },

    igdbFind: function(req, res) {
        console.log("Hitting IGDB for....", req.params.name);
        client.games({
            fields: ['id', 'name', 'url', 'cover', 'platforms'],
            limit: 3,
            search: req.params.name
        }).then(response => {
            res.json(response);
        }).catch(error => {
            throw error;
        });
    }
};