const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// connect to the database and load models
require('./server/models').connect(process.env.MONGODB_URI || config.dbUri);

const app = express();

// Middleware to require HTTPS
function requireHTTPS(req, res, next) {
  if (!req.secure) {
    console.log(JSON.stringify(req));
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/build/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
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

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});