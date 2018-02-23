const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

// Return the Passport Local Strategy object
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim(),
        games: [{        
            id: 0,
            name: "Monster Hunter World",
            summary: "A game about killing monsters",
            platform: ["PS4", "Xbox One"],
            notes: []
        },
        {
            id: 1,
            name: "Zelda: Breath of the Wild",
            summary: "Play as Link where you're cool and stuff",
            platform: ["Switch", "Wii U"],
            notes: []
        }
    ]
    };

    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) { return done(err); }

        return done(null);
    });
});
