const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const config = require('./config');

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  IGDB_KEY: process.env.IGDB_KEY
}

// connect to the database and load models
require('./server/models').connect(process.env.MONGODB_URI || "mongodb://localhost/gamehub");


// --CONFIGURE EXPRESS WEB FRAMEWORK--
const app = express();
// Tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/build/'));
// Tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Pass the passport middleware
app.use(passport.initialize());

// Load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const gameRoutes = require('./server/routes/games');
const userRoutes = require("./server/routes/user");
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/games', gameRoutes);
app.use('/user', userRoutes);

// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 3001));

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});