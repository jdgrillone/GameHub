const mongoose = require("mongoose");
const db = require("../server/models/game.js");
mongoose.Promise = global.Promise;


mongoose.connect(
    process.env.MoONGODB_URI || "mongodb://localhost/gamehub"
);

const gameSeed = [
    {
        title: "Monster Hunter World"
    }
];

db.remove({})
 .then(() => db.collection.insertMany(gameSeed))
 .then(data => {
     console.log(data.insertedCount + " records inserted!");
     process.exit(0);
 })
 .catch(err => {
     console.error(err);
     process.exit(1);
 });