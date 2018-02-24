const mongoose = require("mongoose");
const db = require("../server/models/game.js");
mongoose.Promise = global.Promise;


mongoose.connect(
    process.env.MoONGODB_URI || "mongodb://localhost/gamehub"
);

const gameSeed = [
    {        
        id: 0,
        name: "Monster Hunter World",
        summary: "In the game, the player takes the role of a Hunter, tasked to hunt down and either kill or trap monsters that roam in one of several environmental spaces. If successful, the player is rewarded through loot consisting of parts from the monster and other elements that are used to craft weapons and armor, among other equipment.",
        platform: ["PS4", "Xbox One"],
        notes: []
    },
    {
        id: 1,
        name: "Zelda: Breath of the Wild",
        summary: "The story follows Link, who awakens from a hundred-year slumber to a mysterious voice that guides him to defeat Calamity Ganon before he can destroy the kingdom of Hyrule.",
        platform: ["Switch", "Wii U"],
        notes: []
    },
    {
        id: 3,
        name: "Persona 5",
        summary: "Persona 5 takes place in modern-day Tokyo, and follows the player-named protagonist after his transfer to the fictional Shujin Academy after being put on probation for an assault of which he was falsely accused. During the course of a school year, he and other students awaken to their Persona powers, becoming a group of secret vigilantes known as the Phantom Thieves of Hearts who explore the Metaverse, a supernatural realm consisting of the physical manifestation of humanity's subconscious desires, to change malevolent intent from the hearts of adults.",
        platform: ["PS4"],
        notes: []
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